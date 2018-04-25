import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import SubjectsService from '../services/SubjectsService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    subjects: []
  },
  getters: {
    getSubjects (state) {
      return state.subjects
    }
  },
  mutations: {
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
  },
  actions: {
    async fetchSubjects ({commit}) {
      commit('FETCH_SUBJECTS', await SubjectsService.fetchSubjects())
    },
    async addSubject ({commit}, title) {
      const response = await SubjectsService.addSubject({ title: title })
      commit('ADD_SUBJECT', {title: title, id: response.data.id})
    },
    async deleteSubject ({commit}, subject) {
      await SubjectsService.deleteSubject(subject._id)
      commit('DELETE_SUBJECT', subject.title)
    }
  }
})
