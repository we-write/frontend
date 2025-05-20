export type ColorVariant = 'default' | 'inverted' | 'custom';
export type ColorType = 'primary' | 'secondary' | 'custom';

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
      return `comp-${color}`;
    case 'inverted':
      return `comp-${color}-inverted border-2`;
    case 'custom':
      return '';
    default:
      return assertUnreachable(variant);
  }
};
