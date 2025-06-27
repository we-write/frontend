import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import '@testing-library/jest-dom';

const mockCreateUser = jest.fn();

jest.mock('@/hooks/api/auth/useCreateUser', () => {
  return {
    __esModule: true,
    default: () => ({
      mutate: mockCreateUser,
    }),
  };
});

describe('SignupForm 렌더링 테스트', () => {
  beforeEach(() => {
    mockCreateUser.mockClear();
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
      name: '비밀번호 토글 버튼',
    });
    const passwordInput = screen.getByLabelText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('유효한 값 입력 시 onSubmit이 호출된다', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('닉네임'), {
      target: { value: '테스트닉네임' },
    });
    fireEvent.change(screen.getByLabelText('아이디'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('좋아하는 작품'), {
      target: { value: '위대한 개츠비' },
    });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        {
          name: '테스트닉네임',
          email: 'user@example.com',
          password: 'password123',
          companyName: '위대한 개츠비',
        },
        expect.any(Object)
      );
    });
  });

  it('유효하지 않은 값 입력 시 onSubmit이 호출되지 않는다', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('닉네임'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('아이디'), {
      target: { value: 'invalidEmail' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'different' },
    });
    fireEvent.change(screen.getByLabelText('좋아하는 작품'), {
      target: { value: '' },
    });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('닉네임을 입력해주세요')).toBeInTheDocument();
      expect(
        screen.getByText('이메일 형식이 올바르지 않습니다')
      ).toBeInTheDocument();
      expect(
        screen.getByText('비밀번호는 8자 이상이 되도록 해 주세요')
      ).toBeInTheDocument();
      expect(
        screen.getByText('비밀번호가 일치하지 않습니다')
      ).toBeInTheDocument();
      expect(
        screen.getByText('좋아하는 작품을 입력해주세요')
      ).toBeInTheDocument();
    });

    expect(mockCreateUser).not.toHaveBeenCalled();
  });
});

describe('SignupForm UI 유효성 검사 테스트', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  it('이메일이 비어 있으면 에러 메시지를 표시한다', async () => {
    const emailInput = screen.getByLabelText('아이디');
    fireEvent.change(emailInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('이메일을 입력해주세요')
    ).toBeInTheDocument();
  });

  it('이메일 형식이 잘못되면 에러 메시지를 표시한다', async () => {
    const emailInput = screen.getByLabelText('아이디');
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('이메일 형식이 올바르지 않습니다')
    ).toBeInTheDocument();
  });

  it('비밀번호가 8자 미만이면 에러 메시지를 표시한다', async () => {
    const passwordInput = screen.getByLabelText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: '12345' } });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('비밀번호는 8자 이상이 되도록 해 주세요')
    ).toBeInTheDocument();
  });

  it('비밀번호 확인이 일치하지 않으면 에러 메시지를 표시한다', async () => {
    const passwordInput = screen.getByLabelText('비밀번호');
    const passwordCheckInput = screen.getByLabelText('비밀번호 확인');

    fireEvent.change(passwordInput, { target: { value: 'correctPassword' } });
    fireEvent.change(passwordCheckInput, {
      target: { value: 'wrongPassword' },
    });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('비밀번호가 일치하지 않습니다')
    ).toBeInTheDocument();
  });

  it('닉네임이 비어 있으면 에러 메시지를 표시한다', async () => {
    const nameInput = screen.getByLabelText('닉네임');
    fireEvent.change(nameInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('닉네임을 입력해주세요')
    ).toBeInTheDocument();
  });

  it('좋아하는 작품이 비어 있으면 에러 메시지를 표시한다', async () => {
    const companyInput = screen.getByLabelText('좋아하는 작품');
    fireEvent.change(companyInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('좋아하는 작품을 입력해주세요')
    ).toBeInTheDocument();
  });
});

describe('SignupForm 상태 테스트', () => {
  it('isSubmitting이 true일 때 버튼이 비활성화된다', async () => {
    mockCreateUser.mockImplementation(() => {
      return new Promise(() => {});
    });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('닉네임'), {
      target: { value: '테스트닉네임' },
    });
    fireEvent.change(screen.getByLabelText('아이디'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('좋아하는 작품'), {
      target: { value: '위대한 개츠비' },
    });

    const submitButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    mockCreateUser.mockRestore();
  });
});
