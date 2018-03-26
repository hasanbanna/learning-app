<template>
  <div class="study">
    <div class="top-row-box">
      <div class="top-col-left">
        <strong>{{ subjectTitle }}</strong>
      </div>
      <div class="top-col-right">
        <div class="timeframe-box">
          <div class="timeframe-box-left">
            <timeframe></timeframe>
          </div>
           <div class="timgframe-box-right">
            <button>Add Flashcard</button>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-row-box">
      <div class="middle-col-left">
        <h2>Topics</h2>
        <topic :subjectTitle="subjectTitle"></topic>
      </div>

      <div v-if="topicHasFlashCards" class="middle-col-right">
          <div class='flashcards'>
            <flashcard
              v-for="flashcard in flashCards"
              :key="flashcard"
              :topic="(flashcard+' ')"></flashcard>
          </div>
        </div>
      <div v-else>
        <div class="middle-box-right">
          <p>This topic currently has no flashcards. </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topic from './Topic'
import TimeFrame from './TimeFrame'
import FlashCard from './FlashCard'

export default {
  name: 'Study',
  data () {
    return {
      subjectTitle: '',
      flashCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      topicHasFlashCards: true
    }
  },
  mounted () {
    this.subjectTitle = this.$route.params.subject
  },
  components: {
    'topic': Topic,
    'timeframe': TimeFrame,
    'flashcard': FlashCard
  },
  methods: {
    selectTopic: function (topic) {
      this.selectedTopic = topic
    }
  }
}

</script>

<style lang="sass" scoped>
  strong
    text-transform: capitalize
    font-size: 32px
  .top-row-box
    display: flex
    justify-content: space-between
    .top-col-left
      flex: 1
    .top-col-right
      flex: 1
  .middle-row-box
    display: flex
    justify-content: space-between
    .middle-col-left
      flex: 1
    .middle-col-right
      flex: 1
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
  button
    border: none
    background: rgba(255,0,0,0.8)
    padding: 10px
    text-transform: uppercase
    color: white
    font-weight: bold
    border-radius: 3px
    outline: none
    cursor: pointer
    &:hover
      background: rgba(255,0,0,0.9)
  span
    font-size: 10px
    line-height: 23px
</style>
