<template>
  <button @click="send('LAUNCH')" v-if="state.matches('Start')">Run Machine</button>

  <div class="solution-wrapper" v-if="state.matches('Running')">
    <div class="barrel-oil-flow-wrapper" >
      <div class="pipes">
        <img src="@/assets/pipe_off.png" v-if="isPipeOff"/>
        <img src="@/assets/pipe_on.png" v-if="isPipeOn"/>
      </div>

      <div class="barrels">
        <img src="@/assets/barrel.png" v-if="isBarrelEmpty" />
        <img src="@/assets/barrel_full.png" v-if="isBarrelFull" />
      </div>

      <div class="actions">
        <button @click="send('OPEN_VALVE')">Open Valve</button>
        <button @click="send('TRANSFER')">Transfer To Labeling</button>
      </div>
    </div>

    <div class="labeling-wrapper" v-if="state.context.barrelsAvailable > 0">
      <div class="barrel">
        <img src="@/assets/barrel_full.png" />
      </div>
      
      <input  :disabled="!isStampInput" v-model="stampLabel" type="text" 
        placeholder="Serial No." />

      <p class="barrel-amount">Barrels x{{  state.context.barrelsAvailable  }}</p>
    </div>

    <div class="labeling-actions" v-if="state.context.barrelsAvailable > 0">
      <button @click="send('STAMP')">Stamp Label</button>
      <button @click="transportBarrel()">Send Barrel</button>
    </div>

    <p class="info" v-if="state.context.barrelsAvailable === 0">
      Waiting for barrel...
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMachine } from '@xstate/vue';
import { parallelLabelingMachine } from '../xstate/3-parallel-labeling.xstate';


export default {
  setup() {
    const stampLabel = ref('')
    const { state, send } = useMachine(parallelLabelingMachine, {
      actions: {
        clearStampLabel() { 
          stampLabel.value = '' 
        }
      },
      devTools: true });


    return {
      state,
      send,
      stampLabel
    };
  },
  methods: {
    transportBarrel() {
      this.send({ type: 'TRANSPORT', data: this.stampLabel } );
    }
  },
  computed: {
    isBarrelEmpty() {
      return this.state.matches('Running.Barrel.Empty');
    },
    isPipeOff() {
      return ['Running.Barrel.Empty', 'Running.Barrel.Full'].some(this.state.matches);
    },
    isPipeOn() {
      return this.state.matches('Running.Barrel.Filling Up');
    },
    isBarrelFull() {
      return ['Running.Barrel.Filling Up', 'Running.Barrel.Full'].some(this.state.matches);
    },
    isStampInput() {
      return this.state.matches('Running.Labeling.Stamp Input');
    }
  }
};
</script>

<style scoped>
.solution-wrapper {
  display: flex;
  flex-direction: row;
}

.barrel-oil-flow-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
  border-right: 4px dotted#404040;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.actions>* {
  margin-top: 0.5rem;
}

.pipes {
  width: 560px;
  height: 300px;
}

.barrels {
  margin-left: 223px;
  width: 132px;
  height: 211px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.barrel-amount {
  text-align: center;
  font-weight: bold;
}

.labeling-wrapper {
  margin-left: 2rem;
  display: block;
  flex-direction: row;
  align-self: center;
  place-self: center;
  justify-self: center;
  position: relative;
}

.barrel {
  width: 132px;
  height: 211px;
}

.labeling-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-left: 1rem;
}

input {
  position: absolute;
  bottom: 95px;
  width: 90px;
  margin: 0 auto;
  left: 0;
  right: 0;
  height: 30px;
  background: none;
  border: 2px solid #eee;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
}

.info {
  align-self: center;
  /* justify-self: center; */
  margin-left: 2rem;
  font-weight: bold;
  display: block;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #444;
}
</style>