import { ConnectionEntity } from '@/src/api/types/connectionsTypes';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const connectionsAdapter = createEntityAdapter({
  selectId: (connection: ConnectionEntity) => connection._id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});
