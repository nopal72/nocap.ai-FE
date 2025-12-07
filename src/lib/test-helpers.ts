import Cookies from 'js-cookie';

/**
 * Helper function untuk set mock token untuk development/testing
 * Gunakan ini hanya saat developing tanpa backend authentication
 */
export const setMockAuthToken = () => {
  const mockToken = 'MOCK_JWT_TOKEN_FOR_DEVELOPMENT';
  Cookies.set('auth_token', mockToken, { path: '/' });
  console.log('[Test Helper] Mock token set:', mockToken);
};

/**
 * Helper function untuk clear mock token
 */
export const clearMockAuthToken = () => {
  Cookies.remove('auth_token');
  console.log('[Test Helper] Mock token cleared');
};
