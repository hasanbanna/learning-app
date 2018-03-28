import Api from './Api'

export default {
  fetchTopicsWithSubjectId (id) {
    return Api().get(`topic/${id}`)
  },

  addTopic (params) {
    return Api().post('topic', params)
  },

  updateTopic (params) {
    return Api().put(`topic/${params.id}`, params)
  },

  getTopic (params) {
    return Api().get(`topic/${params.id}`)
  },

  deleteTopic (id) {
    console.log(id)
    return Api().delete(`topic/${id}`)
  }
}
