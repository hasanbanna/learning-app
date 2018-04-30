<template>
  <form @submit.prevent class='d-flex flex-column align-items-stretch'>
    <h4>New flashcard for {{ currentTopic.title }}</h4>
    <div class="row">
      <input type="text" id="question" name="question" placeholder="Question" v-model="question">
    </div>
    <div class="row">
      <textarea name="answer" id="answer" placeholder="Answer" cols="30" rows="10" v-model="answer"></textarea>
    </div>
    <div class="row">
      <button type="button" class="btn btn-success col" @click="addFlashcard">add</button>
      <button type="button" class="btn btn-secondary col" @click="setShowAddFlashcard(false)">cancel</button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'AddFlashcard',
  data () {
    return {
      showNewFlashCardForm: false,
      question: '',
      answer: ''
    }
  },
  methods: {
    addFlashcard () {
      this.$store.dispatch('addFlashcard', {
        question: this.question,
        answer: this.answer,
        topicId: this.currentTopic._id})
    },
    setShowAddFlashcard (bool) {
      this.$store.dispatch('setShowAddFlashcard', bool)
    }
  },
  computed: {
    currentTopic () {
      return this.$store.getters.getCurrentSelectedTopic
    }
  }
}

</script>

<style lang="sass">
  form
    border: 1px solid black

</style>
