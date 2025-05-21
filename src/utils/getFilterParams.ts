/**
 * 객체의 키-값 쌍을 URL 쿼리 파라미터 문자열로 변환합니다.
 * undefined 값을 가진 속성은 제외됩니다.
 *
 * @example
 * ```typescript
 * const params = { name: 'John', age: 30, city: undefined };
 * getFilterParams(params); // "name=John&age=30"
 * ```
 *
 * @param params - 변환할 객체
 * @returns URL 쿼리 파라미터 문자열
 */
export const getFilterParams = <T extends object>(params: T) => {
  return (
    Object.entries(params)
      /* eslint-disable @typescript-eslint/no-unused-vars */
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
};
