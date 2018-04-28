<template>
  <div>
    <input type="text" placeholder="QUESTION" id="question" v-model="question"><br>
    <textarea placeholder="ANSWER" id="answer" v-model="answer"></textarea><br>
    <button>Add</button>
    <button>Cancel</button>
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
