<template>
  <ul>
    <li v-for="timeFrame in timeFrames" :key="timeFrame">
      <div @click="timeFrameClicked(timeFrame)" :class="{'active': (timeFrame === clickedTimeFrame)}" >{{ timeFrame }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      timeFrames: ['Recent', '1 day', '3 days', '1 week', '1 month', '3 months', '6 months', '1 year'],
      clickedTimeFrame: 'Recent'
    }
  },
  methods: {
    timeFrameClicked: function (timeFrame) {
      this.clickedTimeFrame = timeFrame
    }
  }
}
</script>

<style lang="sass" scoped>

  ul
    list-style: none
    padding-left: 5px
    margin: 0
    li
      color: darkgrey
      display: inline-block
      cursor: pointer
    li:not(:first-child)
      padding-left: 15px
  .active
    color: black

</style>
