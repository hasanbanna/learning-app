import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import SubjectsService from '../../services/SubjectsService'
import TopicsService from '../../services/TopicsService'
import FlashcardsService from '../../services/FlashcardsService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    subjects: [],
    currentSelectedSubject: {},
    currentSelectedSubjectTopics: [],
    currentFlashcardsForSelectedTopic: [],
    currentSelectedTopic: {title: 'no title'},
    showAddFlashcard: false,
    showMainReview: false,
    messages: []
  },
  getters: {
    getSubjects: state => state.subjects,
    getCurrentSelectedSubject: state => state.currentSelectedSubject,
    getCurrentSelectedSubjectTopics: state => state.currentSelectedSubjectTopics,
    getCurrentFlashcardsForSelectedTopic: state => state.currentFlashcardsForSelectedTopic,
    getCurrentSelectedTopic: state => state.currentSelectedTopic,
    getShowAddFlashcard: state => state.showAddFlashcard,
    getShowMainReview: state => state.showMainReview,
    getMessages: state => state.messages
  },
  mutations: {
    FETCH_SUBJECTS: (state, payload) => {
      state.subjects = payload.data.map((subject) => {
        return _.pick(subject, ['_id', 'title'])
      })
    },
    ADD_SUBJECT: (state, payload) => state.subjects.push(payload),
    DELETE_SUBJECT: (state, title) => {
      state.subjects = _.reject(state.subjects, (subject) => { return subject.title === title })
    },
    SET_CURRENT_SELECTED_SUBJECT: (state, payload) => {
      state.currentSelectedSubject = payload
    },
    FETCH_CURRENT_SELECTED_SUBJECT_TOPICS: (state, payload) => {
      state.currentSelectedSubjectTopics = payload
      state.currenSelectedTopic = payload[0]
    },
    ADD_TOPIC_FOR_CURRENT_SELECTED_SUBJECT: (state, payload) => {
      state.currentSelectedSubjectTopics.push(payload)
    },
    DELETE_TOPIC_FOR_CURRENT_SELECTED_SUBJECT: (state, id) => {
      state.currentSelectedSubjectTopics = _.reject(state.currentSelectedSubjectTopics, (topic) => { return topic._id === id })
    },
    SET_CURRENT_SELECTED_TOPIC: (state, payload) => {
      state.currentSelectedTopic = payload
    },
    FETCH_ALL_FLASHCARDS_FOR_TOPIC: (state, payload) => {
      state.currentFlashcardsForSelectedTopic = payload
    },
    DELETE_FLASHCARD: (state, id) => {
      state.currentFlashcardsForSelectedTopic = _.reject(state.currentFlashcardsForSelectedTopic, (flashcard) => { return flashcard._id === id })
    },
    SET_SHOW_ADD_FLASCHARD: (state, bool) => { state.showAddFlashcard = bool },
    ADD_FLASHCARD: (state, payload) => {
      state.currentFlashcardsForSelectedTopic.push(payload)
    },
    SET_SHOW_MAIN_REVIEW: (state, bool) => { state.showMainReview = bool }
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
    },
    async fetchAllFlashcardsForTopic ({commit}, id) {
      // add state then get the current selected topic if it exists
      const response = await FlashcardsService.getAllFlashcardForTopic(id)
      commit('FETCH_ALL_FLASHCARDS_FOR_TOPIC', response.data)
    },
    async setCurrentSelectedTopic ({commit}, payload) {
      commit('SET_CURRENT_SELECTED_TOPIC', payload)
    },
    async deleteFlashcard ({commit, state}, id) {
      await FlashcardsService.deleteFlashCard(id)
      state.messages.push('Flashcard deleted!')
      commit('DELETE_FLASHCARD', id)
    },
    async setShowAddFlashcard ({commit}, bool) {
      commit('SET_SHOW_ADD_FLASCHARD', bool)
    },
    async addFlashcard ({commit, state}, payload) {
      const response = await FlashcardsService.addFlashcard({
        question: payload.question,
        answer: payload.answer,
        topic: payload.topicId
      })
      state.messages.push('Flashcard added!')
      payload['_id'] = response.data.id
      commit('ADD_FLASHCARD', {
        question: payload.question,
        answer: payload.answer
      })
    },
    async setShowMainReview ({commit}, bool) {
      commit('SET_SHOW_MAIN_REVIEW', bool)
    }
  }
})
