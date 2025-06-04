/**
 * HTML 문자열에서 모든 태그를 제거하고 순수 텍스트만 추출하는 함수
 * 예: "<p>Hello <strong>World</strong></p>" => "Hello World"
 */

const htmlToString = (input: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = input;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export default htmlToString;
