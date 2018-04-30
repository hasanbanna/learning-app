<template>
  <div class="container" style="margin-top:40px">
    <div class="d-flex justify-content-between align-items-center">
      <!-- <h3 class="subject-title">{{ subjectTitle }} <span><a href="#">concept map</a></span></h3> -->
      <h4 class="subject-title">{{ subjectTitle }}</h4>
      <div class="btn-group btn-group-sm" role="group" aria-label="Action Menu">
        <button type="button" class="btn btn-primary" @click="setShowAddFlashcard(true)">Add New Flashcard</button>
        <button type="button" class="btn btn-secondary" @click="showTestComponent = true">Review Topic</button>
        <!-- <button type="button" class="btn btn-secondary">Review With Related Topics</button> -->
      </div>
    </div>
    <hr>
    <message></message>
    <div class="d-flex flex-row align-items-start" style="margin-top: 40px">
        <topic class='p-1 col-4'></topic>
        <div class='p-1 col'>
          <div v-if="showAddFlashcard">
            <add-flashcard ></add-flashcard>
          </div>
          <div v-else>
            <div v-if="currentSelectedTopic.title">
              <div v-if="flashcards.length > 0" class="card-deck">
                  <flashcard
                    v-for="flashcard in flashcards"
                    :key="flashcard._id"
                    :flashcard="flashcard">
                  </flashcard>
              </div>
              <div v-else>
                <p> This topic currently has no flashcards. </p>
              </div>
            </div>
            <div v-else>
              <p>No topic selected.</p>
            </div>
          </div>
        </div>
    </div>
    <!-- <div v-else-if="showTestComponent && topicHasFlashCards" class="flashcards">
              <review :flashcards="flashcards" @can-show-component="showTestComponent = $event" :key="flashcards[0]._id"></review>
          </div> -->
  </div>
</template>

<script>
import Topic from './Topic'
import Flashcard from './Flashcard'
import Review from './Review'
import AddFlashcard from './AddFlashcard'
import Message from './Message'
export default {
  name: 'Study',
  data () {
    return {
      currentSelectedTopicId: '',
      topicHasFlashCards: false
    }
  },
  created () {
    this.$store.dispatch('setCurrentSelectedSubject', {
      title: this.$route.params.title,
      id: this.$route.params.subject_id
    })
  },
  computed: {
    subjectTitle () {
      return this.$store.getters.getCurrentSelectedSubject.title
    },
    subjectId () {
      return this.$store.getters.getCurrentSelectedSubject.id
    },
    flashcards () {
      return this.$store.getters.getCurrentFlashcardsForSelectedTopic
    },
    currentSelectedTopic () {
      return this.$store.getters.getCurrentSelectedTopic
    },
    showAddFlashcard () {
      return this.$store.getters.getShowAddFlashcard
    }
  },
  components: {
    'topic': Topic,
    'flashcard': Flashcard,
    'add-flashcard': AddFlashcard,
    'review': Review,
    'message': Message
  },
  methods: {
    selectTopic: function (topic) {
      this.selectedTopic = topic
    },
    setShowAddFlashcard (bool) {
      this.$store.dispatch('setShowAddFlashcard', bool)
    }
  }
}

</script>

<style lang="sass" scoped>
.subject-title
  text-transform: uppercase
  font-weight: bold
  margin: 0
</style>
