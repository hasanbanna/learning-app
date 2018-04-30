<template>
  <div v-if="showNewFlashCardForm">
    <button type="button" class="btn btn-primary" @click="addFlashcard">add</button>
    <button type="button" class="btn btn-primary" @click="showNewFlashCardForm = false">close</button><br>
    <input type="text" placeholder="QUESTION" id="question" v-model="question"><br>
    <input type="text" placeholder="ANSWER" id="answer" v-model="answer"><br>
  </div>
  <div v-else>
    <button type="button" class="btn btn-primary" @click="showNewFlashCardForm = true">Add New Flashcard</button>
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

</style>
