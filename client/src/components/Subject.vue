<template>
<div class="subjects">
  <h2>
      <div v-if="showInput">
        Subjects <span @click="canShowInput()">-</span>
      </div>
      <div v-else>
        Subjects <span @click="canShowInput()">+</span>
      </div>
  </h2>
  <div v-if="showInput">
    <input type="text" placeholder="ADD NEW SUBJECT" v-model="subject">
    <button @click="addSubject">add</button>
  </div>
  <ul>
    <li v-for="subject in subjects" :key="subject._id">
      <!-- FIXME: route link needs to have no spaces where as the passed title must have spaces -->
      <span @click="deleteSubject(subject)"> x </span><router-link v-bind:to="{ name: 'Study', params: { title: subject.title, sanitized_title: sanitizeTitle(subject.title), subject_id: subject._id } }">{{ subject.title }}</router-link>
     </li>
  </ul>
</div>
</template>
<script>

export default {
  data () {
    return {
      showInput: false,
      subject: ''
    }
  },
  created () {
    this.$store.dispatch('fetchSubjects')
  },
  computed: {
    subjects () {
      return this.$store.getters.getSubjects
    }
  },
  methods: {
    addSubject () {
      this.$store.dispatch('addSubject', this.subject)
    },
    deleteSubject (subject) {
      this.$store.dispatch('deleteSubject', subject)
    },
    canShowInput () {
      this.showInput = !this.showInput
    },
    sanitizeTitle (title) {
      return title.replace(/\s/g, '-').toLowerCase()
    }
  }
}
</script>
<style lang="sass" scoped>
  .subjects
    text-align: left
    float: left
  span
    color: red
    cursor: pointer
  ul
    font-size: 20px
    font-weight: bold
    list-style: none
    color: #132
    li
       margin-top: 10px
</style>
