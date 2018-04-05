<template>
  <div class='test-container' v-if="flashcardCopy.length > 0">
    <h3 v-if="canShowQuestion">Question: {{ flashcardCopy[0].question }}</h3>
    <h3 v-if="canShowAnswer">Answer: {{  flashcardCopy[0].answer }}</h3>
    <div class="center-container">
      <button @click="canShowAnswer = true" v-if="canShowAnswer == false">Show Answer</button>
      <button @click="canShowAnswer = false" v-if="canShowAnswer == true">Close Answer</button>
    </div>
    <div class="center-container">
      <ul>
        <li><button class="good" @click="goodClicked">good</button></li>
        <li><button class="neutral" @click="neutralClicked">neutral</button></li>
        <li><button class="bad" @click="badClicked">bad</button></li>
      </ul>
    </div>
    {{ goodCounter }}
    {{ neutralCounter }}
    {{ badCounter }}
  </div>
  <div v-else>
    <p>Test is finished.</p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    flashcards: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentQuestion: 0,
      canShowQuestion: true,
      canShowAnswer: false,
      goodCounter: 0,
      neutralCounter: 0,
      badCounter: 0,
      flashcardCopy: []
    }
  },
  created () {
    this.flashcardCopy = this.flashcards.slice()
  },
  methods: {
    goodClicked: function () {
      console.log(this.flashcardCopy.length)
      if (this.flashcardCopy.length > 0) {
        this.flashcardCopy.shift()
        this.goodCounter++
      }
    },
    neutralClicked: function () {
      this.neutralCounter++
      this.currentQuestion++
    },
    badClicked: function () {
      this.badCounter++
      // const currentFlashcard = this.flashcardCopy[this.currentQuestion]
      const currentFlashcard = this.flashcardCopy.shift()
      this.flashcardCopy.push(currentFlashcard)
    }
  }
}
</script>

<style lang="sass" scoped>
.center-container
 width: 100%
 display: flex
 height: 100h
 justify-content: center
ul
 align-self: center
 list-style: none
 padding: 0
 margin: 0
 li
  display: inline
  align-self: center
  margin-left: 5px
button
  color: black
  text-align: center
  margin-bottom: 10px
.good
  background-color: green
.neutral
  background-color: #F5F5DC
.bad
  background-color: red
</style>
