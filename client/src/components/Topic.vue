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
      <li v-for="topic in topics" :key="topic.title">
        <div
          v-if="(topic.title === clickedTopicTitle)"
          @click="topicClicked(topic)"
          :class="{'active': (topic.title === clickedTopicTitle)}" >
          <span @click=deleteTopic(topic)> x </span>{{ topic.title }} - <a href="#">concept map</a>
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

import TopicsService from '../../services/TopicsService'

export default {
  name: 'topic',
  props: {
    subjectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      topics: [],
      clickedTopicTitle: '',
      showInput: false,
      topicName: ''
    }
  },
  created () {
    this.fetchTopicsWithSubjectId(this.subjectId)
  },
  methods: {
    topicClicked: function (topic) {
      this.clickedTopicTitle = topic.title
      this.$emit('topic_id', topic._id)
    },
    async fetchTopicsWithSubjectId (id) {
      const response = await TopicsService.fetchTopicsWithSubjectId(id)
      this.topics = response.data
      this.$emit('topic_id', this.topics[0]._id)
      this.clickedTopicTitle = this.topics[0].title
    },
    async addTopic () {
      if (this.topicName) {
        await TopicsService.addTopic({
          title: this.topicName,
          subject: this.subjectId
        })
        this.showInput = false
        this.topicName = ''
        this.fetchTopicsWithSubjectId(this.subjectId)
      } else {
        // change this later
        alert('Please enter a non-empty topic.')
      }
    },
    async deleteTopic (topic) {
      await TopicsService.deleteTopic(topic._id)
      this.topics.splice(this.topics.indexOf(topic), 1)
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
