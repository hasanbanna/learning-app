<template>
  <div class="card align-self-start" style="width: 18rem;"
   @mouseleave="cardHoveredOver = false"
   @mouseover="cardHoveredOver = true">
   <div class="card-body">
      <h4 class="card-title text-center" :class="{highlighted: cardHoveredOver}" >
        {{ flashcard.question }}
      </h4>
      <div class="card-body text-right">
        <!-- <a href="#">show</a> -->
        <a href="#">edit</a>
        <a href="#">delete</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    flashcard: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cardHoveredOver: false
    }
  },
  mounted () {
  },
  methods: {
    mouseOver: function () {
      this.cardHoveredOver = true
    },
    mouseLeave: function () {
      this.cardHoveredOver = false
    }
  }

}
</script>

<style lang="sass" scoped>
.card-body
  padding: 10px
</style>
