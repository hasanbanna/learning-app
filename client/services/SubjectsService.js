import Api from './Api'

export default {
  fetchSubjects () {
    return Api().get('subject')
  },
  addSubject (params) {
    return Api().post('subject', params)
  },
  updateSubject (params) {
    return Api().put(`subject/${params.id}`, params)
  },

  getSubject (params) {
    return Api().get(`subject/${params.id}`)
  },

  deleteSubject (id) {
    return Api().delete(`subject/${id}`)
  },
  getSubjectCount () {
    return Api().get('subject/count')
  }
}
