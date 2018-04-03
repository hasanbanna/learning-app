<template>
  <div class="study">
    <div class="top-row-box">
      <div class="top-col-left">
        <strong>{{ subjectTitle }} <span><a href="#"> show concept map </a></span></strong>
      </div>
      <div class="top-col-right">
        <div class="timeframe-box">
          <div class="timeframe-box-left">
            <timeframe></timeframe>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-row-box">
      <div class="middle-col-left">
        <topic :subjectId="subjectId" @topic_id="setCurrentSelectedTopicId"></topic>
        <div class="menu">
        <h3>Menu</h3>
          <ul class="action-menu">
            <li><add-flash-card :topicId="currentSelectedTopicId" @add_flash_card="updateFlashCards"></add-flash-card></li>
            <li><button class="test">Test Topic</button></li>
            <li><button class="test">Test With Related Topics</button></li>
          </ul>
        </div>
      </div>
        <div class="middle-col-right">
          <div v-if="flashcards.length > 0">
            <div class='flashcards'>
              <flashcard
                v-for="flashcard in flashcards"
                :key="flashcard._id" :flashcard="flashcard"></flashcard>
            </div>
          </div>
        <div v-else>
          <div class="middle-box-right">
            <p>This topic currently has no flashcards. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from './Topic'
import TimeFrame from './TimeFrame'
import FlashCard from './FlashCard'
import AddFlashCard from './AddFlashCard'
import FlashcardsService from '../../services/FlashcardsService'

export default {
  name: 'Study',
  data () {
    return {
      subjectTitle: '',
      subjectId: 0,
      currentSelectedTopicId: '',
      topicHasFlashCards: false,
      flashcards: []

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
    'add-flash-card': AddFlashCard
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
    },
    updateFlashCards: function (obj) {
      this.flashcards.push(obj)
    }
  },
  watch: {
    currentSelectedTopicId: function () {
      if (this.currentSelectedTopicId) {
        this.fetchGetAllFlashcardForTopic(this.currentSelectedTopicId)
      }
    }
  }
}

</script>

<style lang="sass" scoped>
  strong
    text-transform: capitalize
    font-size: 32px
  .top-row-box
    margin-bottom: 40px
    display: flex
    justify-content: space-between
    .top-col-left
      flex: 1
    .top-col-right
      flex: 2
  .middle-row-box
    margin-bottom: 40px
    display: flex
    justify-content: space-between
    .middle-col-left
      flex: 1
    .middle-col-right
      flex: 2
  .timeframe-box
    display: flex
    align-items: center
    justify-content: center
    .timeframe-box-left
      flex: 1
    .timeframe-box-right
      flex: 2
  .flashcards
    display: flex
    flex-direction: row
    flex-wrap: wrap
    flex-basis: 33%
    padding-top: 10px
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
  .menu
    margin-top: 40px
  .action-menu
    list-style: none
    padding: 0
    margin: 0
    li
      padding-top: 10px
</style>
