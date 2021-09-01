<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <el-row class="inputs">
      <el-input v-if="gridInputEnabled" id="grid" :placeholder="inputGridPlaceholder" v-model="gridInput" maxlength="100" size="medium">
        <el-button type="default" slot="append" icon="el-icon-arrow-right" @click="sendGridInput"></el-button>
      </el-input>
      <el-input v-if="robotInputEnabled" id="robot" :placeholder="inputRobotPlaceholder" v-model="robotInput" maxlength="100" size="medium">
        <el-button type="default" slot="append" icon="el-icon-arrow-right" @click="sendRobotInput"></el-button>
      </el-input>
      <el-input v-if="commandsInputEnabled" id="commands" :placeholder="inputCommandsPlaceholder" v-model="commandsInput" maxlength="100" size="medium">
        <el-button type="default" slot="append" icon="el-icon-arrow-right" @click="sendCommandsInput"></el-button>
      </el-input>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header">
            <h4>Inputs</h4>
          </div>
          <div v-for="(input, index) in inputs" :key="index" class="text item">
            {{ input }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header">
            <h4>Outputs</h4>
          </div>
          <div v-for="(output, index) in outputs" :key="index" class="text item">
            {{ output }}
          </div>
        </el-card>
      </el-col>
    </el-row>
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
      robotId: 0,
      gridInput: '',
      robotInput: '',
      commandsInput: '',
      inputGridPlaceholder: "Please introduce the grid's upper-right corner coords",
      inputRobotPlaceholder: "Please introduce the robot's initial position and direction",
      inputCommandsPlaceholder: 'Please introduce the commands you want to send to the robot',
      gridInputEnabled: true,
      robotInputEnabled: false,
      commandsInputEnabled: false,
      inputs: [],
      outputs: []
    }
  },
  methods: {
    clearInputs() {
      this.gridInput = '';
      this.robotInput = '';
      this.commandsInput = '';
    },
    sendGridInput() {
      if (this.gridInput.trim()) {
        grid.createGrid(this.gridInput.trim())
          .then( newGrid => {
            console.log(newGrid);
            this.inputs.push(this.gridInput);
            this.outputs.push(' ');
            this.enableRobotInput();
          })
          .catch( error => {
            this.$notify.error({
              title: 'Error',
              message: error
            });
            console.log(error);
          });
      }
    },
    sendRobotInput() {
      if (this.robotInput.trim()) {
        this.robotId = null;
        robot.createRobot(this.robotInput.trim())
          .then( newRobot => {
            console.log(newRobot);
            this.inputs.push(this.robotInput);
            this.outputs.push(' ');
            this.enableCommandsInput();
          })
          .catch( error => {
            this.$notify.error({
              title: 'Error',
              message: error
            });
            console.log(error);
          });
      }
    },
    sendCommandsInput() {
      if (this.commandsInput.trim()) {
        grid.getCurrentRobotId()
          .then( id => {
            robot.sendCommands(id, this.commandsInput.trim())
              .then( newState => {
                console.log(newState);
                this.inputs.push(this.commandsInput);
                let outputMessage = '' + newState.position[0] + ' ' + newState.position[1] + ' ' + newState.direction;
                outputMessage = newState.lost ? outputMessage + ' LOST' : outputMessage;
                this.outputs.push(outputMessage);
                this.enableRobotInput();
              })
              .catch( error => {
                this.$notify.error({
                  title: 'Error',
                  message: error
                });
                console.log(error);
              });
          })
          .catch( error => {
            this.$notify.error({
              title: 'Error',
              message: error
            });
            console.log(error);
          });
      }
    },
    enableGridInput() {
      this.gridInputEnabled = true;
      this.robotInputEnabled = false;
      this.commandsInputEnabled = false;
      this.clearInputs();
    },
    enableRobotInput() {
      this.gridInputEnabled = false;
      this.robotInputEnabled = true;
      this.commandsInputEnabled = false;
      this.clearInputs();
    },
    enableCommandsInput() {
      this.gridInputEnabled = false;
      this.robotInputEnabled = false;
      this.commandsInputEnabled = true;
      this.clearInputs();
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.inputs {
  margin-bottom: 30px;
}
</style>
