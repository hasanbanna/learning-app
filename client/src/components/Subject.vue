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
      <span @click="deleteSubject(subject)"> x </span><router-link v-bind:to="{ name: 'Study', params: { subject: subject.title.toLowerCase(), subject_id: subject._id } }">{{ subject.title }}</router-link>
    </li>
  </ul>
</div>
</template>
<script>
import SubjectsService from '../../services/SubjectsService'
export default {
  data () {
    return {
      subjects: [],
      showInput: false,
      subject: ''
    }
  },
  created () {
    this.fetchSubjects()
  },
  methods: {
    async fetchSubjects () {
      const response = await SubjectsService.fetchSubjects()
      this.subjects = response.data
    },
    async addSubject () {
      await SubjectsService.addSubject({
        title: this.subject
      })
      this.subjects.push(this.subject)
    },
    async deleteSubject (subject) {
      await SubjectsService.deleteSubject(subject._id)
      this.subjects.splice(this.subjects.indexOf(subject), 1)
    },
    canShowInput: function () {
      this.showInput = !this.showInput
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
