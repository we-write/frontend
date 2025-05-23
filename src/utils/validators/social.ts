export const validateCapacity = (value: number): boolean | string => {
  if (!value) return '모집 정원을 입력해 주세요.';

  if (isNaN(value)) return '숫자만 입력 가능합니다.';
  if (value < 2 || value > 10)
    return '모집 정원은 2-10인 사이로 입력해 주세요.';

  return true;
};

export const validateLocation = (value: string): boolean | string => {
  if (!value) return '장르를 선택해 주세요.';
  return true;
};

export const validateRegistrationEnd = (
  value: string,
  startDate: string
): boolean | string => {
  if (!value) return '마감 날짜를 선택해 주세요.';
  if (!startDate) return '시작 날짜를 먼저 선택해 주세요.';

  const registrationEnd = new Date(value);
  const start = new Date(startDate);

  if (registrationEnd >= start)
    return '마감 날짜는 시작 날짜보다 이전이어야 합니다.';
  return true;
};
