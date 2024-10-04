import axios from 'axios';


const api = axios.create({
  // baseURL: 'http://localhost:5000/api', 
  baseURL:'https://eovl2ymmef.execute-api.eu-north-1.amazonaws.com/dev/api'
});


api.interceptors.request.use(
  async (config) => {

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response && response.status === 401) { 
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResponse = await axios.post('http://localhost:5000/refresh-token', {
          refreshToken
        });

        if (refreshResponse.status === 200) {
          const { accessToken } = refreshResponse.data;
          localStorage.setItem('accessToken', accessToken);

          const originalRequest = response.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
