import axios from 'axios';

const getTabId = () => {
  let tabId = sessionStorage.getItem('tabId');
  if (!tabId) {
    tabId = crypto.randomUUID(); // Unique per tab
    sessionStorage.setItem('tabId', tabId);
  }
  return tabId;
};

const instance = axios.create({
  baseURL: 'https://okgestionfile-springboot-fullstack.onrender.com',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers['X-Tab-ID'] = getTabId();
  return config;
});

export default instance;