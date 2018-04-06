<template>
  <div  class="flashcard"
   @mouseleave="cardHoveredOver = false"
   @mouseover="cardHoveredOver = true">
    <div class="question" :class="{highlighted: cardHoveredOver}" >
      {{ flashcard.question }}
    </div>
    <ul v-if="cardHoveredOver" class="options">
      <li><a href="#">show</a></li>
      <li><a href="#">edit</a></li>
      <li><a href="#">delete</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    flashcard: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cardHoveredOver: false
    }
  },
  mounted () {
  },
  methods: {
    mouseOver: function () {
      this.cardHoveredOver = true
    },
    mouseLeave: function () {
      this.cardHoveredOver = false
    }
  }

}
</script>

<style lang="sass" scoped>
.flashcard
  border: 1px solid rgba(0,0,0,0.3)
  border-radius: 3px
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)
  position: relative
  flex-basis: 30%
  min-height: 150px
  display: flex
.question
  font-size: 20px
  font-weight: bold
  line-height: 23px
  transition: transform 0.3s
  text-align: center
  padding: 10px
  margin: auto
.highlighted
  transform: scale(1.05)
.options
  position: absolute
  bottom: 0
  right: 10px
  list-style: none
  font-size: 10px
  color: green
  li
    display: inline-block

</style>
