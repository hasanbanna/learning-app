<template>
  <div v-if="showNewFlashCardForm">
    <button @click="addFlashcard">add</button>
    <button @click="showNewFlashCardForm = false">close</button><br>

    <input type="text" placeholder="QUESTION" id="question" v-model="question"><br>
    <input type="text" placeholder="ANSWER" id="answer" v-model="answer"><br>
  </div>
  <div v-else>
    <button @click="showNewFlashCardForm = true">Add New Flashcard</button>
  </div>
</template>

<script>

import FlashcardsService from '../../services/FlashcardsService'

export default {
  name: 'AddFlashCard',
  props: {
    topicId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showNewFlashCardForm: false,
      question: '',
      answer: ''
    }
  },
  methods: {
    async addFlashcard () {
      await FlashcardsService.addFlashcard({
        question: this.question,
        answer: this.answer,
        topic: this.topicId
      })
      this.$emit('add_flash_card', {
        question: this.question,
        answer: this.answer,
        topic: this.topicId
      })
    }
  }
}

</script>

<style lang="sass">
  button
    border: none
    background: rgba(100,100,100,0.7)
    padding: 10px
    text-transform: uppercase
    color: white
    font-weight: bold
    border-radius: 3px
    outline: none
    cursor: pointer
    &:hover
      background: rgba(100,100,100,0.9)
</style>
