import SubjectsService from '../../../services/SubjectsService'
import _ from 'lodash'
const state = {
  all: []
}

const getters = {
 getSubjects: state => state.all,
 getCurrentSelectedSubject: state => state.currentSelectedSubject
}

const mutations = {
  FETCH_SUBJECTS: (state, payload) => {
    state.subjects = payload.data.map((subject) => {
      return _.pick(subject, ['_id', 'title'])
    })
  },
  ADD_SUBJECT: (state, payload) => {
    state.subjects.push(payload)
  },
  DELETE_SUBJECT: (state, title) => {
    state.subjects = _.reject(state.subjects, (subject) => { return subject.title === title })
  }

}
