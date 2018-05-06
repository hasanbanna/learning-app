<template>
    <div>
        <h4> Review </h4>
        <div class="box-container">
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
            <div class="box">4</div>
        </div>
        <div>
          <button>Longterm Memory</button>
        </div>
    </div>
</template>

<script>

export default {
  computed: {
    getCurrentTopic () {
      return this.$store.getters.getCurrentSelectedSubject
    }
  }
}

</script>

<style lang="sass" scoped>
  h4
    text-align: center
  .box-container
    display: flex
    justify-content: space-between
    .box
      border: 1px solid black
      height: 50px
      width: 50px
</style>
