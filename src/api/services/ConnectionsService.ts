import { apiRequest } from '../apiRequest';
import { CONNECTIONS_ROUTES } from '../routes';
import { ApiPaginatedResponse } from '../types/apiTypes';
import { ConnectionEntity } from '../types/connectionsTypes';

class ConnectionsService {
  async createConnection(connectedUser: string) {
    try {
      await apiRequest({
        url: CONNECTIONS_ROUTES.ROUTE_CONNECTIONS,
        method: 'POST',
        data: { connectedUser },
      });

      return true;
    } catch (error) {
      console.error('Failed to create connection:', error);
      throw error;
    }
  }

  async getConnections(page: number = 1) {
    try {
      const {
        data: { data },
      } = await apiRequest<ApiPaginatedResponse<ConnectionEntity>>({
        url: CONNECTIONS_ROUTES.ROUTE_CONNECTIONS,
        params: {
          page,
        },
      });

      return data;
    } catch (error) {
      console.error('Failed to fetch connections:', error);
      throw error;
    }
  }

  async deleteConnection(connectionId: string) {
    try {
      await apiRequest({
        url: CONNECTIONS_ROUTES.ROUTE_CONNECTIONS_DELETE.replace(
          ':id',
          connectionId
        ),
        method: 'DELETE',
      });

      return connectionId;
    } catch (error) {
      console.error('Failed to delete connection:', error);
      throw error;
    }
  }
}
export default new ConnectionsService();
