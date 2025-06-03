export interface ChipProps {
  text: string;
  chipType: 'default' | 'rounded' | 'badge' | 'info' | 'state' | 'custom';
  className?: string;
  color?: 'primary' | 'secondary' | 'custom';
  variant?: 'default' | 'inverted';
}
