import { LoadingType } from '@/src/api/types/apiTypes';
import { ConnectionEntity } from '@/src/api/types/connectionsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { connectionsAdapter } from './connectionsAdapter';

import * as connectionsAsyncActions from './connectionsActions';
import * as connectionsSelectors from './connectionsSelectors';

type ConnectionsInitialState = {
  errorMessage: string | null;
  loading: LoadingType;
  currentPage: number;
  selectedConnection: ConnectionEntity | null;
  totalPages: number;
};

const initialState =
  connectionsAdapter.getInitialState<ConnectionsInitialState>({
    errorMessage: null,
    loading: 'idle',
    currentPage: 1,
    selectedConnection: null,
    totalPages: 0,
  });

const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    setSelectedConnection: (state, action: PayloadAction<string>) => {
      state.selectedConnection = connectionsAdapter
        .getSelectors()
        .selectById(state, action.payload);
    },
    clearSelectedConnection: state => {
      state.selectedConnection = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch connections
      .addCase(connectionsAsyncActions.getMyConnectionsThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(
        connectionsAsyncActions.getMyConnectionsThunk.fulfilled,
        (state, action) => {
          state.loading = 'success';
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          connectionsAdapter.setAll(state, action.payload.data);
        }
      )
      .addCase(
        connectionsAsyncActions.getMyConnectionsThunk.rejected,
        (state, action) => {
          state.loading = 'error';
          state.errorMessage =
            (action.payload as string) || 'connections.fetch.error';
        }
      )

      // Create connection
      .addCase(connectionsAsyncActions.createConnectionThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(
        connectionsAsyncActions.createConnectionThunk.fulfilled,
        state => {
          state.loading = 'success';
        }
      )
      .addCase(
        connectionsAsyncActions.createConnectionThunk.rejected,
        (state, action) => {
          state.loading = 'error';
          state.errorMessage =
            (action.payload as string) || 'connections.create.error';
        }
      )

      // Delete connection
      .addCase(connectionsAsyncActions.deleteConnectionThunk.pending, state => {
        state.loading = 'loading';
      })
      .addCase(
        connectionsAsyncActions.deleteConnectionThunk.fulfilled,
        (state, action) => {
          state.loading = 'success';
          connectionsAdapter.removeOne(state, action.payload);
        }
      )
      .addCase(
        connectionsAsyncActions.deleteConnectionThunk.rejected,
        (state, action) => {
          state.loading = 'error';
          state.errorMessage =
            (action.payload as string) || 'connections.delete.error';
        }
      );
  },
});

export const connectionsActions = {
  ...connectionsAsyncActions,
  ...connectionsSlice.actions,
};
export { connectionsSelectors };

export default connectionsSlice.reducer;
