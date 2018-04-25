<template>
  <div class="topic">
    <h2>Topics <span> <a @click="showInput = true" href="#"> add new topic </a> </span></h2>
    <div v-if="showInput" class='add-topic'>
      <input type="text" placeholder="ADD NEW TOPIC" v-model="topicName">
      <button @click="addTopic">add</button>
      <button @click="showInput = false">close</button>
    </div>
    <div v-if="topics.length > 0">
    <ul>
      <li v-for="topic in topics" :key="topic._id">
        <div
          v-if="(topic.title === clickedTopicTitle)"
          @click="topicClicked(topic)"
          :class="{'active': (topic.title === clickedTopicTitle)}" >
          <span @click=deleteTopic(topic._id)> x </span>{{ topic.title }} - <a href="#">concept map</a>
        </div>
        <div v-else
         @click="topicClicked(topic)"
         :class="{'active': (topic.title === clickedTopicTitle)}" >
           {{ topic.title }}</div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'topic',
  data () {
    return {
      clickedTopicTitle: '',
      showInput: false,
      topicName: ''
    }
  },
  created () {
    this.$store.dispatch('fetchTopicsForCurrentSelectedSubject', this.$store.getters.getCurrentSelectedSubject.id)
  },
  computed: {
    topics () {
      return this.$store.getters.getCurrentSelectedSubjectTopics
    }
  },
  methods: {
    topicClicked: function (topic) {
      this.clickedTopicTitle = topic.title
      this.$store.dispatch('setCurrentSelectedTopic', topic)
      this.$store.dispatch('fetchAllFlashcardsForTopic', topic._id)
    },
    addTopic () {
      if (this.topicName) {
        this.$store.dispatch('addTopicForCurrentSelectedSubject', {
          title: this.topicName,
          subject: this.$store.getters.getCurrentSelectedSubject.id
        })
        this.showInput = false
        this.topicName = ''
      } else {
        // change this later
        alert('Please enter a non-empty topic.')
      }
    },
    deleteTopic (topicId) {
      this.$store.dispatch('deleteTopicForCurrentSelectedSubject', topicId)
    }
  }
}
</script>

<style lang="sass" scoped>
  .topic
    flex-direction: column
    flex-basis: 30%
  ul
    list-style: none
    padding-left: 0
    li
      cursor: pointer
      color: darkgrey
  .active
    color: black
  span
    font-size: 10px
    line-height: 23px
  a
    text-decoration: none
  a, a:visited
    color: blue
  .add-topic
    padding-bottom: 10px
</style>
