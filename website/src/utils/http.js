import axios from 'axios'
import { showNotify } from 'vant';

// 创建一个实例，此后都在此实例上改造
const http = axios.create({
  timeout: 10000,
  withCredentials: true,
	baseURL: "/api",
	headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
})
// 请求拦截器
const beforeRequest = config => {
  return config
}

http.interceptors.request.use(beforeRequest)

// 响应拦截器
const responseSuccess = response => {
	const data = response.data
  if (data.code === 200){
	  return Promise.resolve(response.data)
  }else {
		showNotify({message: data.msg, type: "danger"})
	  return Promise.reject(data)
  }
}

const responseFailed = error => {
  const { response } = error
  if (response) {
	  console.log(response)
		showNotify({message: response.statusText, type: "danger"})
    return Promise.reject()
  } else if (!window.navigator.onLine) {
	  showNotify({message: "没有网络", type: "danger"})
    return Promise.reject(new Error('请检查网络连接'))
  }
  return Promise.reject(error)
}
http.interceptors.response.use(responseSuccess, responseFailed)

export default http
