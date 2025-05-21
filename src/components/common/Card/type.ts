import { ReactNode } from 'react';

interface BaseTextContentProps {
  title: string | null;
  genre: string | null;
}

interface GridCardtextContentProps extends BaseTextContentProps {
  description: string | null;
}

interface ImageProps {
  src: string | null;
  alt: string | null;
}

export interface GridCardProps {
  pageId: string | null;
  tag?: ReactNode;
  image: ImageProps;
  textContent: GridCardtextContentProps;
  isCardDataLoading: boolean;
}
