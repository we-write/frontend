import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import '@testing-library/jest-dom';
import { FormEvent, FormEventHandler } from 'react';
import { signInValidate } from '@/utils/validators/auth';

// 하나의 모킹 객체로 통합
const mockUseSignInForm = jest.fn();

jest.mock('@/hooks/api/auth/useSignInForm', () => ({
  __esModule: true,
  useSignInForm: () => mockUseSignInForm(),
}));

describe('SignInForm 렌더링 테스트', () => {
  beforeEach(() => {
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: {},
      onSubmit: jest.fn(), // 여기서 직접 jest.fn() 사용
    });
  });

  it('이메일과 비밀번호 입력 필드가 렌더링되어야 한다', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('비밀번호 토글 버튼을 클릭하면 입력 타입이 바뀐다', () => {
    render(<SignInForm />);
    const toggleButton = screen.getByRole('button', {
      name: '비밀번호 토글 버튼',
    });
    const passwordInput = screen.getByLabelText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('유효한 값 입력 시 onSubmit이 호출된다', async () => {
    const mockSubmit = jest.fn();
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: {},
      onSubmit: mockSubmit,
    });

    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

describe('SignInForm 에러 메시지 테스트', () => {
  beforeEach(() => {
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: { email: { message: '이메일을 입력해주세요' } },
      onSubmit: jest.fn(),
    });
  });

  it('이메일 에러가 있을 때 에러 메시지가 렌더링된다', () => {
    render(<SignInForm />);
    expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
  });

  it('비밀번호 에러가 있을 때 에러 메시지가 렌더링된다', () => {
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: { password: { message: '비밀번호를 입력해주세요' } },
      onSubmit: jest.fn(),
    });

    render(<SignInForm />);
    expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
  });
});

describe('SignInForm 제출 상태 테스트', () => {
  beforeEach(() => {
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: true,
      errors: {},
      onSubmit: jest.fn(),
    });
  });

  it('isSubmitting이 true일 때 버튼이 비활성화된다', () => {
    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    expect(submitButton).toBeDisabled();
  });

  it('에러가 있을 때 버튼이 비활성화된다', () => {
    mockUseSignInForm.mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: { email: { message: '이메일을 입력해주세요' } },
      onSubmit: jest.fn(),
    });

    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    expect(submitButton).toBeDisabled();
  });
});

describe('SignInForm 유효성 검사 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('이메일이 비어 있으면 에러 메시지를 반환한다', () => {
    const result = signInValidate({ value: '', name: 'email' });
    expect(result).toBe('이메일을 입력해주세요');
  });

  it('이메일 형식이 잘못되면 에러 메시지를 반환한다', () => {
    const result = signInValidate({ value: 'invalidEmail', name: 'email' });
    expect(result).toBe('이메일 형식이 올바르지 않습니다');
  });

  it('올바른 이메일이면 true를 반환한다', () => {
    const result = signInValidate({ value: 'test@example.com', name: 'email' });
    expect(result).toBe(true);
  });

  it('비밀번호가 비어 있으면 에러 메시지를 반환한다', () => {
    const result = signInValidate({ value: '', name: 'password' });
    expect(result).toBe('비밀번호를 입력해주세요');
  });

  it('비밀번호가 8자 미만이면 에러 메시지를 반환한다', () => {
    const result = signInValidate({ value: '12345', name: 'password' });
    expect(result).toBe('비밀번호는 8자 이상이 되도록 해 주세요');
  });

  it('비밀번호가 공백 포함이면 에러 메시지를 반환한다', () => {
    const result = signInValidate({ value: 'abcd efgh', name: 'password' });
    expect(result).toBe(
      '비밀번호는 숫자와 문자로 이루어진 8자 이상이 되도록 해 주세요'
    );
  });

  it('올바른 비밀번호면 true를 반환한다', () => {
    const result = signInValidate({ value: 'securePass1', name: 'password' });
    expect(result).toBe(true);
  });
});
