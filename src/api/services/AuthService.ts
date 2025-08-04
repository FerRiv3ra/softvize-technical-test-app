import { apiRequest } from '../apiRequest';
import { AUTH_ROUTES } from '../routes';
import { ApiResponse } from '../types/apiTypes';
import {
  EmailAvailabilityEnum,
  RegisterUserType,
  UserEntity,
} from '../types/authTypes';

class AuthService {
  async login(identifier: string, password: string) {
    try {
      const {
        data: { data },
      } = await apiRequest<ApiResponse<UserEntity>>({
        method: 'POST',
        url: AUTH_ROUTES.ROUTE_AUTH_SIGN_IN,
        data: {
          identifier,
          password,
        },
      });

      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'login.failed');
    }
  }

  async refreshToken() {
    try {
      await apiRequest({
        url: AUTH_ROUTES.ROUTE_AUTH_REFRESH,
      });

      return true;
    } catch (error: any) {
      throw new Error('login.session_expired');
    }
  }

  async verifyEmail(email: string) {
    try {
      const {
        data: { data },
      } = await apiRequest<ApiResponse<EmailAvailabilityEnum>>({
        method: 'POST',
        url: AUTH_ROUTES.ROUTE_AUTH_VERIFY_EMAIL,
        data: { email },
      });

      return data;
    } catch (error: any) {
      throw new Error(
        error.response.data.message || 'email.verification_failed'
      );
    }
  }

  async register(data: RegisterUserType) {
    try {
      const {
        data: { data: user },
      } = await apiRequest<ApiResponse<UserEntity>>({
        method: 'POST',
        url: AUTH_ROUTES.ROUTE_AUTH_SIGN_UP,
        data,
      });

      return user;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'registration.failed');
    }
  }
}

export default new AuthService();
