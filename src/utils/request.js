import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 全局请求头
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout,
})

// request interceptor
service.interceptors.request.use(
  config => {
    //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
     //  config.headers['X-Token'] = getToken()
      // config.headers['X-Token'] = getToken()getToken()
      config.headers['Authorization'] = 'Bearer ' + getToken()
      //   'Authorization': 'Bearer ' + token,
    }

    // 这里需要调整，糊涂的走通了
    if(config.url != '/user/info'){
      //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers.Authorization = 'Bearer ' + getToken();
    }


    //
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
  },
  error => {
    // do something with request error
    //console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000 && res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired; UnAuthorize 401
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 401) {
        // to re-login
        MessageBox.confirm('您已注销，可以取消以留在此页，或重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("重置Token");
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      console.log(res);

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    if(error == 'Error: Request failed with status code 401'){

      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }

   // console.log('err' + error) // for debug


    // if 401 则跳



    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
