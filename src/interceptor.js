import axios from 'axios';
import { useLoader } from './loaderContext';
const instance = axios.create();
export const useInterceptor = () => {
  const loader = useLoader();

  instance.interceptors.request.use(
    function (config) {
      loader.showLoader();
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      loader.hideLoader();
      return response;
    },
    function (error) {
      loader.hideLoader();
      return Promise.reject(error);
    }
  );
  return instance;
};