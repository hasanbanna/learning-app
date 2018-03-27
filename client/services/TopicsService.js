import Api from './Api'

export default {
  fetchTopicsWithSubjectId (id) {
    return Api().get(`topics/${id}`)
  },

  addTopic (params) {
    return Api().post('topics', params)
  },

  updateTopic (params) {
    return Api().put(`topics/${params.id}`, params)
  },

  getTopic (params) {
    return Api().get(`topic/${params.id}`)
  },

  deleteTopic (id) {
    return Api().delete(`topics/${id}`)
  },
}
