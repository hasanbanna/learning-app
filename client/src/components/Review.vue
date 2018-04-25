// TODO: Is the neutral button needed?
<template>
  <div class='test-container' v-if="flashcardCopy.length > 0">
    <h2 v-if="canShowQuestion">Question: {{ flashcardCopy[0].question }}</h2>
    <h2 v-if="canShowAnswer">Answer: {{  flashcardCopy[0].answer }}</h2>
    <div class="answer-btn-container">
      <button @click="canShowAnswer = true" v-if="canShowAnswer == false">Show Answer</button>
      <button @click="canShowAnswer = false" v-if="canShowAnswer == true">Close Answer</button>
    </div>
    <div class="btn-container">
      <ul>
        <li><button class="good" @click="goodClicked">good</button></li>
        <li><button class="neutral" @click="neutralClicked">neutral</button></li>
        <li><button class="bad" @click="badClicked">bad</button></li>
        <li><button class="quit" @click="$emit('can-show-component',false)">quit</button></li>
      </ul>
    </div>
    <div class="timer">time: {{ time }} </div>
  </div>
  <div v-else>
    good: {{ goodCounter }}
    neutral: {{ neutralCounter }}
    bad: {{ badCounter }}
    final time: {{ time }}
    <p>Test is finished.</p>
    <span @click="goBackToFlashCards"> go back to flashcards </span>
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
      canShowQuestion: true,
      canShowAnswer: false,
      goodCounter: 0,
      neutralCounter: 0,
      badCounter: 0,
      flashcardCopy: [],
      time: 0,
      timer: null
    }
  },
  created () {
    this.flashcardCopy = this.flashcards.slice()
    this.timer = setInterval(() => {
      this.time++
    }, 1000)
  },
  methods: {
    goodClicked: function () {
      if (this.flashcardCopy.length > 0) {
        this.flashcardCopy.shift()
        this.goodCounter++
        clearInterval(this.timer)
      }
    },
    neutralClicked: function () {
      this.neutralCounter++
      const currentFlashcard = this.flashcardCopy.shift()
      this.flashcardCopy.push(currentFlashcard)
    },
    badClicked: function () {
      this.badCounter++
      const currentFlashcard = this.flashcardCopy.shift()
      this.flashcardCopy.push(currentFlashcard)
    },
    goBackToFlashCards: function () {
      this.$emit('showTestComponent', 'false')
    },
    quitClicked: function () {
      this.$emit('show_review_component', 'false')
    }
  }
}
</script>

<style lang="sass" scoped>
.test-container
  border: 1px solid rgba(100,100,100,0.5)
  text-align: center
  border-radius: 5px
  min-height: 450px
  width: 100%
  padding: 10px
  margin-top: 20px
  position: relative
.answer-btn-container
  position: absolute
  bottom: 15%
  left: 50%
  transform: translate(-50%)
.btn-container
  position: absolute
  bottom: 5%
  left: 50%
  transform: translate(-50%)
ul
  list-style: none
  padding: 0
  margin: 0
  li
    display: inline
    margin-left: 5px
h2
  text-align: center
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
.timer
  position: absolute
  left: 10px
  bottom: 10px
</style>
