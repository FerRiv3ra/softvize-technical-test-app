import ConnectionsService from '@/src/api/services/ConnectionsService';
import { logAppError, logAppEvent } from '@/src/utils/helpers/Logger';
import { createAsyncThunk } from '@reduxjs/toolkit';

/* * Thunks for managing user connections
 * These thunks handle fetching, creating, and deleting connections.
 * They use the ConnectionsService to interact with the backend API.
 * Each thunk logs events and errors for better debugging and analytics.
 * The results are returned to the Redux store for state management.
 */

/* * Fetches the current user's connections.
 * This thunk retrieves the list of connections for the authenticated user.
 * It uses the ConnectionsService to make the API call.
 * If successful, it returns the connections data.
 * If an error occurs, it logs the error and returns a rejection value.
 */
export const getMyConnectionsThunk = createAsyncThunk(
  'connections/getMyConnections',
  async (page: number, { rejectWithValue }) => {
    try {
      logAppEvent('getMyConnectionsThunk', 'Fetching user connections');
      const response = await ConnectionsService.getConnections(page);
      return response;
    } catch (error) {
      logAppError('Error fetching connections:', error);
      return rejectWithValue('Failed to fetch connections');
    }
  }
);

/* * Creates a new connection with a specified user.
 * This thunk allows the user to connect with another user by their ID.
 * It uses the ConnectionsService to send the request to the backend.
 * If successful, it returns true to indicate the connection was created.
 * If an error occurs, it logs the error and returns a rejection value.
 */
export const createConnectionThunk = createAsyncThunk(
  'connections/createConnection',
  async (connectedUser: string, { rejectWithValue }) => {
    try {
      logAppEvent('Creating connection with user', connectedUser);
      const response = await ConnectionsService.createConnection(connectedUser);
      return response;
    } catch (error: any) {
      logAppError('Error creating connection (createConnectionThunk):', error);
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to create connection'
      );
    }
  }
);

/* * Deletes an existing connection by its ID.
 * This thunk allows the user to remove a connection with another user.
 * It uses the ConnectionsService to send the delete request to the backend.
 * If successful, it returns true to indicate the connection was deleted.
 * If an error occurs, it logs the error and returns a rejection value.
 */
export const deleteConnectionThunk = createAsyncThunk(
  'connections/deleteConnection',
  async (connectionId: string, { rejectWithValue }) => {
    try {
      logAppEvent('Deleting connection with ID', connectionId);
      const response = await ConnectionsService.deleteConnection(connectionId);
      return response;
    } catch (error) {
      logAppError('Error deleting connection:', error);
      return rejectWithValue('Failed to delete connection');
    }
  }
);
