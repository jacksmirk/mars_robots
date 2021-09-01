<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <el-input v-if="enableGridInput" id="grid" :placeholder="inputPlaceholder" v-model="input" maxlength="100" size="medium">
    </el-input>
    <el-input v-if="enableRobotInput" id="robot" :placeholder="inputPlaceholder" v-model="input" maxlength="100" size="medium">
    </el-input>
    <el-input v-if="enableCommandsInput" id="commands" :placeholder="inputPlaceholder" v-model="input" maxlength="100" size="medium">
    </el-input>
  </div>
</template>

<script>
import robot from '../models/robot.js'
import grid from '../models/grid.js'

export default {
  name: 'Layout',
  props: {
    msg: String
  },
  data() {
    return {
      input: '',
      inputPlaceholder: 'Please input ',
      enableGridInput: true,
      enableRobotInput: false,
      enableCommandsInput: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main {
  margin: 2% 20%;
}
</style>
