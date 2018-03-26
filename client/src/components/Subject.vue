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
    <button @click="addSubject(subject)">add</button>
  </div>
  <ul>
    <li v-for="subject in subjects" :key="subject">
      <router-link v-bind:to="{ name: 'Study', params: { subject: subject.toLowerCase() } }">{{ subject }}</router-link>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data () {
    return {
      subjects: [],
      showInput: false,
      subject: ''
    }
  },
  mounted () {
    this.subjects = ['Art', 'Robots', 'Politics']
  },
  methods: {
    addSubject: function (subject) {
      this.subjects.push(subject)
      this.subject = ''
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
