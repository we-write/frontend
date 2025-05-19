export type ColorVariant = 'default' | 'inverted';
export type ColorType = 'primary' | 'secondary';

/** 안전한 switch exhaustiveness 체크 */
const assertUnreachable = (x: never): never => {
  throw new Error(`Unhandled case: ${x}`);
};

export const getColorSystem = (
  color: ColorType = 'primary',
  variant: ColorVariant = 'default'
): string => {
  switch (variant) {
    case 'default':
      return `btn-${color}`;
    case 'inverted':
      return `border-2 btn-${color}-inverted`;
    default:
      return assertUnreachable(variant); // 타입 안전성 확보
  }
};
