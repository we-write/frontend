import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import SocialForm from './SocialForm';
import '@testing-library/jest-dom';
import { GenreType } from '@/api/social/type';
import userEvent from '@testing-library/user-event';

import {
  validateCapacity,
  validateLocation,
  validateRegistrationEnd,
} from '@/utils/validators/social';

type SocialFieldsRequest = {
  title: string;
  genre: GenreType;
  image: File | null;
  registrationEnd: string;
  capacity: number;
};

const TestWrapper = () => {
  const methods = useForm<SocialFieldsRequest>({
    defaultValues: {
      title: '',
      genre: '판타지', // 유효한 값 지정 (GenreType 중 하나)
      image: null,
      registrationEnd: '',
      capacity: 0,
    },
  });

  return (
    <FormProvider {...methods}>
      <SocialForm methods={methods} />
      <button type="submit" aria-label="모임생성">
        모임생성
      </button>
    </FormProvider>
  );
};

describe('SocialForm 렌더링 테스트', () => {
  it('필드가 정상적으로 렌더링된다', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText('스토리명')).toBeInTheDocument();

    expect(screen.getByLabelText('장르')).toBeInTheDocument();

    expect(screen.getByLabelText('썸네일 이미지')).toBeInTheDocument();

    expect(screen.getByLabelText('모임 마감날짜')).toBeInTheDocument();

    expect(screen.getByLabelText('모집 정원')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: '파일 찾기' })
    ).toBeInTheDocument();
  });
});

describe('SocialForm 동작 테스트', () => {
  it('필수 입력값을 모두 채우고 제출하면 제출이 이루어진다', async () => {
    render(<TestWrapper />);
    // 필드 입력
    fireEvent.change(screen.getByLabelText('스토리명'), {
      target: { value: '테스트 스토리' },
    });
    fireEvent.change(screen.getByLabelText('장르'), {
      target: { value: '판타지' },
    });
    fireEvent.change(screen.getByLabelText('모임 마감날짜'), {
      target: { value: '2099-12-31' },
    });
    fireEvent.change(screen.getByLabelText('모집 정원'), {
      target: { value: 5 },
    });

    const submitButton = screen.getByLabelText('모임생성');
    await userEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);
  });
});

describe('validateCapacity', () => {
  it('정원이 없으면 에러 메시지를 반환한다', () => {
    expect(validateCapacity(0)).toBe('모집 정원을 입력해 주세요.');
  });

  it('숫자가 아니면 에러 메시지를 반환한다', () => {
    expect(validateCapacity(NaN)).toBe('모집 정원을 입력해 주세요.');
  });

  it('2 미만이면 에러 메시지를 반환한다', () => {
    expect(validateCapacity(1)).toBe(
      '모집 정원은 2-10인 사이로 입력해 주세요.'
    );
  });

  it('10 초과이면 에러 메시지를 반환한다', () => {
    expect(validateCapacity(11)).toBe(
      '모집 정원은 2-10인 사이로 입력해 주세요.'
    );
  });

  it('2~10 사이 값이면 true를 반환한다', () => {
    expect(validateCapacity(5)).toBe(true);
    expect(validateCapacity(2)).toBe(true);
    expect(validateCapacity(10)).toBe(true);
  });
});

describe('validateLocation', () => {
  it('값이 없으면 에러 메시지를 반환한다', () => {
    expect(validateLocation('')).toBe('장르를 선택해 주세요.');
  });

  it('값이 있으면 true를 반환한다', () => {
    expect(validateLocation('판타지')).toBe(true);
  });
});

describe('validateRegistrationEnd', () => {
  const today = new Date();
  const todayStr = today.toISOString();
  const yesterdayStr = new Date(today.getTime() - 86400000).toISOString(); // 1일 전

  it('마감 날짜가 없으면 에러 메시지를 반환한다', () => {
    expect(validateRegistrationEnd('', todayStr)).toBe(
      '마감 날짜를 선택해 주세요.'
    );
  });

  it('시작 날짜가 없으면 에러 메시지를 반환한다', () => {
    expect(validateRegistrationEnd(todayStr, '')).toBe(
      '시작 날짜를 먼저 선택해 주세요.'
    );
  });

  it('마감 날짜가 시작 날짜보다 이후면 에러 메시지를 반환한다', () => {
    expect(validateRegistrationEnd(todayStr, yesterdayStr)).toBe(
      '마감 날짜는 시작 날짜보다 이전이어야 합니다.'
    );
  });

  it('마감 날짜가 시작 날짜보다 이전이면 true를 반환한다', () => {
    expect(validateRegistrationEnd(yesterdayStr, todayStr)).toBe(true);
  });
  it('썸네일 이미지를 업로드하면 input에 파일이 반영된다', async () => {
    render(<TestWrapper />);
    const fileInput = screen.getByLabelText(
      '썸네일 이미지'
    ) as HTMLInputElement;

    const file = new File(['dummy'], 'thumbnail.png', { type: 'image/png' });

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files?.[0].name).toBe('thumbnail.png');
  });
});
