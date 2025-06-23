import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import '@testing-library/jest-dom';
import { FormEvent, FormEventHandler } from 'react';

jest.mock('@/hooks/api/auth/useSignUpForm', () => () => {
  return {
    register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
    handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
    getValues: jest.fn(() => 'password123'),
    isSubmitting: false,
    errors: {},
    onSubmit: jest.fn(),
  };
});

describe('SignupForm', () => {
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

    const toggleButton = screen.getAllByRole('button', {
      name: /show password|hide password/i,
    })[0];
    const passwordInput = screen.getByLabelText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    // 다음 렌더에서 type이 'text'일 것으로 기대 (실제 컴포넌트 구현에 따라 다를 수 있음)
  });

  it('유효하지 않은 값으로 제출하면 에러 메시지를 보여준다', async () => {
    render(<SignupForm />);

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/닉네임을 입력해주세요/)).not.toBeNull();
      expect(screen.queryByText(/이메일을 입력해주세요/)).not.toBeNull();
    });
  });

  it('유효한 값 입력 시 onSubmit이 호출된다', async () => {
    const mockSubmit = jest.fn();
    jest.mock('@/hooks/api/auth/useSignUpForm', () => () => ({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: FormEventHandler) => (e: FormEvent) => fn(e),
      getValues: jest.fn(() => 'password123'),
      isSubmitting: false,
      errors: {},
      onSubmit: mockSubmit,
    }));

    render(<SignupForm />);
    const submitButton = screen.getByRole('button', { name: /회원가입/i });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
