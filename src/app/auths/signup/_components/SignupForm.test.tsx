import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import '@testing-library/jest-dom';
import { FormEvent, FormEventHandler } from 'react';
import { signUpValidate } from '@/utils/validators/auth';

const mockSubmit = jest.fn();

jest.mock('@/hooks/api/auth/useSignUpForm', () => {
  return {
    __esModule: true,
    default: () => ({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      getValues: jest.fn(() => 'password123'),
      isSubmitting: false,
      errors: {},
      onSubmit: mockSubmit,
    }),
  };
});

describe('SignupForm 렌더링 테스트', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('모든 입력 필드가 렌더링되어야 한다', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText('닉네임')).toBeInTheDocument();
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
    expect(screen.getByLabelText('좋아하는 작품')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /회원가입/i })
    ).toBeInTheDocument();
  });

  it('비밀번호 토글 버튼을 클릭하면 입력 타입이 바뀐다', () => {
    render(<SignupForm />);
    const toggleButton = screen.getByRole('button', {
      name: 'toggleShowPassword',
    });
    const passwordInput = screen.getByLabelText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
  });

  it('유효한 값 입력 시 onSubmit이 호출된다', async () => {
    render(<SignupForm />);
    const submitButton = screen.getByRole('button', { name: /회원가입/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

describe('SignupForm 유효성 검사 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('이메일이 비어 있으면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({ value: '', name: 'email' });
    expect(result).toBe('이메일을 입력해주세요');
  });
  it('이메일 형식이 잘못되면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({ value: 'invalidEmail', name: 'email' });
    expect(result).toBe('이메일 형식이 올바르지 않습니다');
  });
  it('올바른 이메일이면 true를 반환한다', () => {
    const result = signUpValidate({ value: 'test@example.com', name: 'email' });
    expect(result).toBe(true);
  });

  it('비밀번호가 8자 미만이면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({ value: '12345', name: 'password' });
    expect(result).toBe('비밀번호는 8자 이상이 되도록 해 주세요');
  });
  it('비밀번호 확인이 일치하지 않으면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({
      value: 'wrongPassword',
      name: 'passwordCheck',
      password: 'correctPassword',
    });
    expect(result).toBe('비밀번호가 일치하지 않습니다');
  });
  it('닉네임이 비어 있으면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({ value: '', name: 'name' });
    expect(result).toBe('닉네임을 입력해주세요');
  });

  it('좋아하는 작품이 비어 있으면 에러 메시지를 반환한다', () => {
    const result = signUpValidate({ value: '', name: 'companyName' });
    expect(result).toBe('좋아하는 작품을 입력해주세요');
  });
});
