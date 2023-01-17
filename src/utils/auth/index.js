import {AUTH_LOCAL_STORAGE_KEY, INFO_USER_LOCAL_STORAGE_KEY} from 'constants/auth';
import history from 'routes/history';

const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const handleLogout = () => {
  if (window.location.pathname !== '/login') {
    history.replace('/login');
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    localStorage.removeItem(INFO_USER_LOCAL_STORAGE_KEY);
  }
};

export {getAuth, handleLogout};
