import { UserEntity } from './authTypes';

export type ConnectionEntity = {
  _id: string;
  connectedUser: UserEntity;
  createdAt: string;
  deleted: boolean;
  updatedAt: string;
  user: string;
};
