<template>
  <form @submit.prevent class='d-flex flex-column align-items-stretch '>
    <div class="row">
      <input type="text" id="question" name="question" placeholder="Question">
    </div>
    <div class="row">
      <textarea name="answer" id="answer" placeholder="Answer" cols="30" rows="10"></textarea>
    </div>
    <div class="row">
      <button type="button" class="btn btn-success col">add</button>
      <button type="button" class="btn btn-secondary col" @click="setShowAddFlashcard(false)">cancel</button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'AddFlashcard',
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
    // async addFlashcard () {
    //   await FlashcardsService.addFlashcard({
    //     question: this.question,
    //     answer: this.answer,
    //     topic: this.topicId
    //   })
    //   // this.$emit('add_flash_card', {
    //   //   question: this.question,
    //   //   answer: this.answer,
    //   //   topic: this.topicId
    //   // })
    // },
    setShowAddFlashcard (bool) {
      this.$store.dispatch('setShowAddFlashcard', bool)
    }
  },
  computed: {

  }
}

</script>

<style lang="sass">
  form
    border: 1px solid black

</style>
