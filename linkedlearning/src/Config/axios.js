import axios from "axios";
import store from "../store/mainIndex";
import Routes from "../router/index";
// const baseURL = "https://a996-2405-201-d004-104b-4446-9aec-1503-16bd.in.ngrok.io/"
const baseURL = "https://api-linkedlearning.onrender.com/";
// const baseURL = "http://localhost:8000/"
axios.defaults.baseURL = baseURL;

axios.defaults.headers.get["ngrok-skip-browser-warning"] = "*";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${store.getters.getAccessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const refreshInstance = axios.create({
  url: baseURL,
});

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status == 401 && error.response.data.errCode == 2) {
      // token has expired
      const config = {
        headers: {
          Authorization: `Bearer ${store.getters.getRefreshToken}`,
        },
      };
      try {
        const res = await refreshInstance.patch("auth/newtoken", {}, config);
        if (res.status == 200) {
          store.dispatch("setAccessToken", res.data.token);
          return axios(error.config);
        } else {
          //clear store are push to login
          store.dispatch("clearAuthState");
          Routes.push({ name: "login" });
        }
      } catch (err) {
        console.log(err, "In refresh");
      }
    }
    throw error;
  }
);

export default refreshInstance;
