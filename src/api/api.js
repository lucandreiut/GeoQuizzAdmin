import axios from 'axios'
import conf from '../config'
import ls from 'local-storage'

const api = axios.create({
  baseURL: conf.remoteURL,
  headers: {
    Authorization: 'Bearer ' + ls.get('token')
  }
})

export default api
