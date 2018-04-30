<template>
  <ul v-if="messages.length > 0" class="messages d-flex justify-content-center mx-auto">
    <li v-for="(message,index) in messages" :key="index"> {{ message }}</li>
  </ul>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.getters.getMessages
    }
  }
}
</script>

<style lang="sass" scoped>
  .messages
    border: 1px solid lightgrey
    list-style: none
    padding: 5px
    margin-top: 20px
    max-width: 50%
</style>
