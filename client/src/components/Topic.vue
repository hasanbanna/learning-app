<template>
  <div>
    <h2>Topics <span> <a @click="showInput = true"> add new topic </a> </span></h2>
    <div v-if="showInput">
      <input type="text" placeholder="ADD NEW TOPIC" v-model="topicName">
      <button @click="addTopic">add</button>
    </div>
    <ul>
      <li v-for="topic in topics" :key="topic.title">
        <div
          v-if="(topic.title === clickedTopic)"
          @click="topicClicked(topic.title)"
          :class="{'active': (topic.title === clickedTopic)}" >
          <span @click=deleteTopic(topic._id)> x </span>{{ topic.title }} - <a href="#">show concept map</a>
        </div>
        <div v-else
         @click="topicClicked(topic.title)"
         :class="{'active': (topic.title === clickedTopic)}" >
           {{ topic.title }}</div>
      </li>
    </ul>
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
      clickedTopic: '',
      showInput: false,
      topicName: ''
    }
  },
  created () {
    this.fetchTopicsWithSubjectId(this.subjectId)
  },
  methods: {
    topicClicked: function (topic) {
      this.clickedTopic = topic
    },
    async fetchTopicsWithSubjectId (id) {
      const response = await TopicsService.fetchTopicsWithSubjectId(id)
      this.topics = response.data
    },
    async addTopic () {
      await TopicsService.addTopic({
        title: this.topicName,
        subject: this.subjectId
      })
      this.showInput = false
      this.fetchTopicsWithSubjectId(this.subjectId)
    },
    async deleteTopic (id) {
      await TopicsService.deleteTopic(id)
    }
  }
}
</script>

<style lang="sass" scoped>
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
</style>
