<template>
  <div class="study">
    <div class="header">
      <strong class="subject-title">{{ subjectTitle }} <span><a href="#">concept map </a></span></strong>
      <ul class="action-menu">
        <li><add-flash-card :topicId="currentSelectedTopicId" @add_flash_card="updateFlashCards"></add-flash-card></li>
        <li><button class="test" @click="showTestComponent = true">Review Topic</button></li>
        <li><button class="test">Review With Related Topics</button></li>
      </ul>
    </div>
    <div class="middle-row-container">
        <topic :subjectId="subjectId" @topic_id="setCurrentSelectedTopicId"></topic>
          <div v-if="flashcards.length > 0 && !showTestComponent" class="flashcards">
              <flashcard
                v-for="flashcard in flashcards"
                :key="flashcard._id"
                :flashcard="flashcard">
              </flashcard>
          </div>
          <div v-else-if="showTestComponent && topicHasFlashCards">
              <review :flashcards="flashcards" @showTestComponent="showTestComponent" :key="flashcards[0]._id"></review>
          </div>
          <div v-else>
            <p>This topic currently has no flashcards. </p>
          </div>
    </div>
  </div>
</template>

<script>
import Topic from './Topic'
import TimeFrame from './TimeFrame'
import FlashCard from './FlashCard'
import AddFlashCard from './AddFlashCard'
import Review from './Review'
import FlashcardsService from '../../services/FlashcardsService'

export default {
  name: 'Study',
  data () {
    return {
      subjectTitle: '',
      subjectId: 0,
      currentSelectedTopicId: '',
      topicHasFlashCards: false,
      flashcards: [],
      showTestComponent: false

    }
  },
  created () {
    this.subjectTitle = this.$route.params.subject
    this.subjectId = this.$route.params.subject_id
  },
  components: {
    'topic': Topic,
    'timeframe': TimeFrame,
    'flashcard': FlashCard,
    'add-flash-card': AddFlashCard,
    'review': Review
  },
  methods: {
    selectTopic: function (topic) {
      this.selectedTopic = topic
    },
    setCurrentSelectedTopicId: function (id) {
      this.currentSelectedTopicId = id
    },
    async fetchGetAllFlashcardForTopic (topicId) {
      const response = await FlashcardsService.getAllFlashcardForTopic(topicId)
      this.flashcards = response.data
      if (this.flashcards.length !== 0) {
        this.topicHasFlashCards = true
      } else {
        this.topicHasFlashCards = false
      }
    },
    updateFlashCards: function (obj) {
      this.flashcards.push(obj)
    }
  },
  watch: {
    currentSelectedTopicId: function (id) {
      this.currentSelectedTopicId = id
      this.fetchGetAllFlashcardForTopic(id)
    }
  }
}

</script>

<style lang="sass" scoped>
.header
  display: flex
  justify-content: space-between
  align-items: center
.action-menu
  list-style: none
  padding: 0
  margin: 0
  align-self: flex-end
  li
    display: inline-block
    margin-left: 10px
.middle-row-container
  display: flex
  justify-content: space-between
  margin-top: 40px
.flashcards
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  flex-direction: row
  flex: 1
button
  border: none
  background: rgba(200,200,200,0.7)
  padding: 10px
  text-transform: uppercase
  color: white
  font-weight: bold
  border-radius: 3px
  outline: none
  cursor: pointer
  &:hover
    background: rgba(200,200,200,0.9)
span
  font-size: 10px
  line-height: 150%
  a
    text-decoration: none
    &:hover
    padding-bottom: 2px
    border-bottom: 1px solid blue

</style>
