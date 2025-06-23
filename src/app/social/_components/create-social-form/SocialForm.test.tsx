import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import SocialForm from './SocialForm';
import '@testing-library/jest-dom';
import { GenreType } from '@/api/social/type';

// 실제 SocialForm에서 사용하는 필드 타입 예시
type SocialFieldsRequest = {
  title: string;
  genre: GenreType;
  image: File | null;
  registrationEnd: string;
  capacity: number;
};

// 테스트용 wrapper
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
