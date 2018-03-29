<template>
  <div  class="flashcard"
   @mouseleave="cardHoveredOver = false"
   @mouseover="cardHoveredOver = true">
    <div class="question" :class="{highlighted: cardHoveredOver}" >
      Question
    </div>
    <ul v-if="cardHoveredOver" class="options">
      <li><a href="#">show</a></li>
      <li><a href="#">edit</a></li>
      <li><a href="#">delete</a></li>
    </ul>
  </div>
</template>

<script>
import FlashcardsService from '../../services/FlashcardsService'
export default {
  props: {
    topicId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      flashcards: [],
      cardHoveredOver: false
    }
  },
  created () {
    this.fetchGetAllFlashcardForTopic()
  },
  methods: {
    async fetchgetAllFlashcardForTopic () {
      const response = await FlashcardsService.getAllFlashcardForTopic(this.topicId)
      console.log(response)
      this.flashcards = response.data
    },
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
    flex: auto
    border: 1px solid rgba(0,0,0,0.3)
    border-radius: 3px
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)
    width: 250px
    min-height: 150px
    margin-left: 5px
    margin-bottom: 5px
    position: relative
  .question
    font-size: 24px
    font-weight: bold
    text-align: center
    vertical-align: middle
    line-height: 150px
    transition: transform 0.3s
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
