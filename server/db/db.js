const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

// 创建axios请求前面的部分
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 处理请求错误
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

// 处理请求结果
const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

// 创建请求头拼接请求地址
module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'x-APICloud-AppId': appId,
      'X-APIClod-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos() {
      return handleRequest(
        await request.get(`/${className}`, {
          headers: getHeaders()
        })
      )
    }
  }
}
