import axios from 'axios'
import store from '../store/mainIndex'
import Routes from '../router/index'
const baseURL = 'https://ba93-2405-201-d004-104b-ace1-f062-b016-9baa.ngrok.io/'
axios.defaults.baseURL = baseURL;

axios.defaults.headers.get["ngrok-skip-browser-warning"] = "*"

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${store.getters.getAccessToken}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const refreshInstance = axios.create({
    url: baseURL,
  })

axios.interceptors.response.use(resp=>resp, async error => {
  console.log(error)
  if(error.response.status == 401 && error.response.data.errCode == 2){
    // token has expired
    const config = {
      headers : {
        Authorization : `Bearer ${store.getters.getRefreshToken}`
      }
    }
    try{
      const res = await refreshInstance.patch('auth/newtoken', {} , config)
      if(res.status == 200){
        store.dispatch('setAccessToken' , res.data.token)
        return axios(error.config)
      }else{
        //clear store are push to login
        store.dispatch('clearAuthState')
        Routes.push({name : 'login'})
      }
    }catch(err){
      console.log(err , "In refresh")
    }
  }
    console.log(error)
    throw error;
})

export default refreshInstance