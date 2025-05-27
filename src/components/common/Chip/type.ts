export interface ChipProps {
  text: string;
  chipType: 'default' | 'rounded' | 'custom';
  className?: string;
  color?: 'primary' | 'secondary' | 'custom';
  variant?: 'default' | 'inverted';
}
