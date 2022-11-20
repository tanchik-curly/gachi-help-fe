export const API_BASE_URL = 'https://localhost:7298';

const API_ROUTES = {
  AUTHORIZATOIN_URL: `${API_BASE_URL}/auth/login`,
  REQUESTED_HELP_URL: `${API_BASE_URL}/help`,
  REQUESTED_HELP_CATEGORIES: `${API_BASE_URL}/categories`,
  USERS_URL: `${API_BASE_URL}/users`,
  STATISTICS_URL: `${API_BASE_URL}/stat`,
  CATEGORIES_URL: `${API_BASE_URL}/helpcategories`,
  COMMENT_URL: `${API_BASE_URL}/users`,
};

export default API_ROUTES;
