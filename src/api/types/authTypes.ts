export interface UserEntity {
  _id: string;
  avatar: string;
  createdAt: string;
  deleted: boolean;
  email: string;
  name: string;
  updatedAt: string;
}

export type RegisterUserType = {
  email: string;
  name: string;
  password: string;
};

export enum EmailAvailabilityEnum {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  IDLE = 'IDLE',
}
