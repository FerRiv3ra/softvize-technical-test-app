import { LoadingType } from '@/src/api/types/apiTypes';
import { EmailAvailabilityEnum, UserEntity } from '@/src/api/types/authTypes';

export type AuthSliceInitialStateType = {
  authRefreshStatus: LoadingType;
  errorMessage: string | null;
  isEmailAvailable: EmailAvailabilityEnum;
  loading: LoadingType;
  isLogged: boolean;
  user: UserEntity | null;
};
