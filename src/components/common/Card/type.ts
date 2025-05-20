import { ReactNode } from 'react';

export interface GridCardProps {
  pageId: string | null;
  tag?: ReactNode;
  imageSrc: string | null;
  imageAlt: string | null;
  title: string | null;
  genre: string | null;
  description: string | null;
}
