<template>
  <div id="app">
    <img alt="Vue logo" width="144" src="./assets/robot.png">
    <HelloWorld :msg="greeting"/>
  </div>
</template>

<script>
// componenets
import HelloWorld from './components/HelloWorld.vue'

// models
import msg from './models/Message.js'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      greeting: ''
    }
  },
  created () {
    this.getMsg()
  },
  methods: {
    getMsg () {
      return msg.getInitMsg()
        .then(msg => this.greeting = msg)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
