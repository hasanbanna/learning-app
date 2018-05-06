<template>
  <div class="add-flashcard-container">
    <h4>New flashcard for {{ currentTopic.title }}</h4>
      <input type="text" id="question" name="question" placeholder="Question" v-model="question">
      <textarea name="answer" id="answer" placeholder="Answer" cols="30" rows="5" v-model="answer"></textarea>
      <div class="button-container">
        <button type="button" class="btn btn-success" @click="addFlashcard">add</button>
        <button type="button" class="btn btn-secondary" @click="setShowAddFlashcard(false)">cancel</button>
      </div>
  </div>
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

.add-flashcard-container
  display: flex
  flex-direction: column
  width: 80%
  margin: auto
  h4
    text-align: center
    margin-bottom: 20px
  input
    padding: 5px
    margin-bottom: 10px
    border: 1px solid rgba(100,100,100,0.5)
    border-radius: 3px
  textarea
    outline: none
    padding: 5px
    border: 1px solid rgba(100,100,100,0.5) 
    border-radius: 3px
.button-container
  display: flex
  justify-content: flex-end
  button
    margin: 15px 0px 0 5px
    font-weight: bold
    
</style>
