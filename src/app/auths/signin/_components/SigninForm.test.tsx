import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import '@testing-library/jest-dom';
import { FormEvent, FormEventHandler } from 'react';
import { signInValidate } from '@/utils/validators/auth';

const mockSubmit = jest.fn();

jest.mock('@/hooks/api/auth/useSignInForm', () => {
  return {
    __esModule: true,
    useSignInForm: () => ({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      isSubmitting: false,
      errors: {},
      onSubmit: mockSubmit,
    }),
  };
});

describe('SignInForm 렌더링 테스트', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
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
      name: /show password|hide password/i,
    });
    const passwordInput = screen.getByLabelText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
  });

  it('유효한 값 입력 시 onSubmit이 호출된다', async () => {
    render(<SignInForm />);
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
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
