import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import SubjectsService from '../services/SubjectsService'
import TopicsService from '../services/TopicsService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    subjects: [],
    currentSelectedSubject: {},
    currentSelectedSubjectTopics: []
  },
  getters: {
    getSubjects (state) {
      return state.subjects
    },
    getCurrentSelectedSubject (state) {
      return state.currentSelectedSubject
    },
    getCurrentSelectedSubjectTopics (state) {
      return state.currentSelectedSubjectTopics
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
    },
    SET_CURRENT_SELECTED_SUBJECT: (state, payload) => {
      state.currentSelectedSubject = payload
    },
    FETCH_CURRENT_SELECTED_SUBJECT_TOPICS: (state, payload) => {
      state.currentSelectedSubjectTopics = payload
    },
    ADD_TOPIC_FOR_CURRENT_SELECTED_SUBJECT: (state, payload) => {
      state.currentSelectedSubjectTopics.push(payload)
    },
    DELETE_TOPIC_FOR_CURRENT_SELECTED_SUBJECT: (state, id) => {
      state.currentSelectedSubjectTopics = _.reject(state.currentSelectedSubjectTopics, (topic) => { return topic._id === id })
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
    },
    async setCurrentSelectedSubject ({commit}, payload) {
      commit('SET_CURRENT_SELECTED_SUBJECT', payload)
    },
    async fetchTopicsForCurrentSelectedSubject ({commit}, id) {
      const response = await TopicsService.fetchTopicsWithSubjectId(id)
      commit('FETCH_CURRENT_SELECTED_SUBJECT_TOPICS', response.data)
    },
    async addTopicForCurrentSelectedSubject ({commit}, payload) {
      const response = await TopicsService.addTopic(payload)
      payload['_id'] = response.data.id
      commit('ADD_TOPIC_FOR_CURRENT_SELECTED_SUBJECT', payload)
    },
    async deleteTopicForCurrentSelectedSubject ({commit}, id) {
      await TopicsService.deleteTopic(id)
      commit('DELETE_TOPIC_FOR_CURRENT_SELECTED_SUBJECT', id)
    }
  }
})
