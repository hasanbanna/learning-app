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
export default {
  name: 'topic',
  props: {
    subjectTitle: {
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
  mounted () {
    this.topics = ['Topic 1', 'Topic 2', 'Topic 3']
    this.clickedTopic = this.topics[0]
  },
  methods: {
    topicClicked: function (topic) {
      this.clickedTopic = topic
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
