<template>
  <div>
    <ul>
      <li v-for="topic in topics" :key="topic">
        <div
          v-if="(topic === clickedTopic)"
          @click="topicClicked(topic)"
          :class="{'active': (topic === clickedTopic)}" >
          {{ topic }} - <a href="#">show concept map</a>
        </div>
        <div v-else
         @click="topicClicked(topic)"
         :class="{'active': (topic === clickedTopic)}" >
           {{ topic }}</div>
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
      clickedTopic: ''
    }
  },
  created () {
    this.fetchTopicsWithSubjectId(this.subjectId)
  },
  mounted () {

  },
  methods: {
    topicClicked: function (topic) {
      this.clickedTopic = topic
    },
    async fetchTopicsWithSubjectId (id) {
      const response = await TopicsService.fetchTopicsWithSubjectId(id)
      this.topics = response.data.map((topic) => {
        return topic.title
      })
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
</style>
