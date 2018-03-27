import Api from './Api'

export default {
  fetchSubjects () {
    return Api().get('subjects')
  },

  addSubject (params) {
    return Api().post('subjects', params)
  },
  updateSubject (params) {
    return Api().put(`subjects/${params.id}`, params)
  },

  getSubject (params) {
    return Api().get(`subject/${params.id}`)
  },

  deleteSubject (id) {
    return Api().delete(`subjects/${id}`)
  },
  getSubjectCount () {
    return Api().get('subjects/count')
  }
}
