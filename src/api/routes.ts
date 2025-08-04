// Authentication Routes
const ROUTE_AUTH_SIGN_IN = "/auth/sign-in"; // Sign in endpoint
const ROUTE_AUTH_SIGN_OUT = "/auth/sign-out"; // Sign out endpoint
const ROUTE_AUTH_VERIFY_USERNAME = "/auth/verify-username"; // Verify username availability
const ROUTE_AUTH_VERIFY_EMAIL = "/auth/verify-email"; // Verify email availability
const ROUTE_AUTH_SIGN_UP = "/auth/sign-up"; // Sign up endpoint
const ROUTE_AUTH_REFRESH = "/auth/refresh"; // Refresh token
const ROUTE_AUTH_SEED = "/auth/load-seed"; // Seed database with initial data

// Connections
const ROUTE_CONNECTIONS = "/connections"; // Base route for connections
const ROUTE_CONNECTIONS_DELETE = `${ROUTE_CONNECTIONS}/:id`; // Delete connection endpoint

export const AUTH_ROUTES = {
  ROUTE_AUTH_REFRESH,
  ROUTE_AUTH_SEED,
  ROUTE_AUTH_SIGN_IN,
  ROUTE_AUTH_SIGN_OUT,
  ROUTE_AUTH_SIGN_UP,
  ROUTE_AUTH_VERIFY_EMAIL,
  ROUTE_AUTH_VERIFY_USERNAME,
};

export const CONNECTIONS_ROUTES = {
  ROUTE_CONNECTIONS,
  ROUTE_CONNECTIONS_DELETE,
};
