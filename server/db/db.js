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
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    // 查询
    async getAllTodos() {
      return handleRequest(
        await request.get(
          `/${className}`, {
            headers: getHeaders()
          })
      )
    },
    // 创建
    async addTodo(todo) {
      return handleRequest(
        await request.post(
          `/${className}`,
          todo,
          {headers: getHeaders()}
        )
      )
    },
    // 更新
    async updateTodo(id, todo) {
      return handleRequest(
        await request.put(
          `/${className}/${id}`,
          todo,
          {headers: getHeaders()}
        )
      )
    },
    // 删除
    async deleteTodo(id) {
      return handleRequest(
        await request.delete(
          `/${className}/${id}`,
          {headers: getHeaders()}
        ))
    },
    // 批量删除
    async deleteCompleted(ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(
        await request.post(
          '/batch',
          {requests},
          {headers: getHeaders()}
        )
      )
    }
  }
}
