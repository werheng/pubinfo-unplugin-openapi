import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'

export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),

  baseURL: '',
  timeout: 60 * 1000,

  // 响应缓存
  localCache: null,

  // 请求拦截
  beforeRequest: () => {},

  // 响应拦截
  responded: {
    async onSuccess(response) {
      return Promise.resolve(response.data)
    },
  },
})

export default alovaInstance
