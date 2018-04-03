import Api from './Api'

export default {
  fetchFlashcards () {
    return Api().get('flashcard')
  },
  addFlashcard (params) {
    return Api().post('flashcard', params)
  },
  updateFlashcard (params) {
    return Api().put(`flashcard/${params.id}`, params)
  },

  getAllFlashcardForTopic (topicId) {
    return Api().get(`flashcard/${topicId}`)
  },

  deleteFlashCard (id) {
    return Api().delete(`flashcard/${id}`)
  },
  getFlashCardCount () {
    return Api().get('flashcard/count')
  }
}
