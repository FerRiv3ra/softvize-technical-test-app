import { RootState } from '../store';
import { connectionsAdapter } from './connectionsAdapter';

// Returns the connections state
const connectionsSelector = connectionsAdapter.getSelectors(
  (state: RootState) => state.connections
);

// Selects all connections
export const selectAllConnections = connectionsSelector.selectAll;
// Selects a connection by its ID
export const selectConnectionById = connectionsSelector.selectById;
// Selects the total number of connections
export const selectTotalConnections = connectionsSelector.selectTotal;
// Selects the current page of connections
export const selectCurrentPage = (state: RootState) =>
  state.connections.currentPage;
// Selects the total number of pages for connections
export const selectTotalPages = (state: RootState) =>
  state.connections.totalPages;
// Selects the loading state of connections
export const selectConnectionsLoading = (state: RootState) =>
  state.connections.loading;
// Selects the error message for connections
export const selectConnectionsError = (state: RootState) =>
  state.connections.errorMessage;
// Selects the selected connection
export const selectSelectedConnection = (state: RootState) =>
  state.connections.selectedConnection;

/**
 * Advanced selectors
 * These selectors provide more complex data derived from the state.
 */
// Convenience selector for checking if connections are currently loading
export const selectIsLoading = (state: RootState) =>
  state.connections.loading === 'loading';
