import axios from 'axios'
import {createError} from './util'

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
      request.then(res => {
        const data = res.data
        if (!data) {
          return reject(createError(400, 'no data'))
        }
        if (!data.success) {
          return reject(createError(400, data.message))
        }
        resolve(data);
      }).catch(err => {
        const res = err.response
        console.log('---------------', res)
        if (res.status === 401) {
          reject(createError(401, 'need auth'))
        }
      })
    }
  )
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todo'))
  }
}
