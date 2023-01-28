import axios from "axios";

const jwInterceptor = axios.create({});

jwInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await axios
        .get("http://localhost:3000/refresh-token", {
          withCredentials: true,
        })
        .catch((refreshTokenAPIError) => {
          localStorage.removeItem("token");
          return Promise.reject(refreshTokenAPIError);
        });
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default jwInterceptor;
