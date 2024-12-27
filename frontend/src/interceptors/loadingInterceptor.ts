import axios from 'axios';
type Props = {
  showLoading: () => void,
  hideLoading: () => void,
}
const setLoadingInterceptor = ({ showLoading, hideLoading }: Props) => {
  axios.interceptors.request.use(
    req => {
      if (!(req.data instanceof FormData)) showLoading();
      return req;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    res => {
      hideLoading();
      return res;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};

export default setLoadingInterceptor;