import { VariantType } from 'notistack';

declare interface SnackbarData {
  message: string;
  variant?: VariantType;
  duration?: number;
}

declare interface SnackbarState {
  message: string;
  variant: VariantType;
  duration: number;
}
