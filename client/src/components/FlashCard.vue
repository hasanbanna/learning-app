<template>
  <div class="flashcard">
    <div class="question">Question</div>
  </div>

</template>

<script>
export default {
  props: {
    topic: {
      type: String,
      required: true
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
  .question
   font-size: 24px
   font-weight: bold
   text-align: center
   vertical-align: middle
   line-height: 150px

</style>
