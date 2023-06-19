<template>
  <div class="solution-wrapper">
    <div class="barrel-oil-flow-wrapper">
      <div class="pipes">
        <img src="@/assets/pipe_off.png" v-if="state.value !== 'Barrel Filling Up'"/>
        <img src="@/assets/pipe_on.png" v-if="state.value === 'Barrel Filling Up'"/>
      </div>
      
      <div class="barrels">
        <img src="@/assets/barrel.png" v-if="state.value === 'Empty'"/>
        <img src="@/assets/barrel_full.png" v-if="state.value !== 'Empty'"/>
      </div>
      
      <div class="actions">
        <button @click="send('OPEN_VALVE')">Open Valve</button>
        <button @click="send('CLOSE_VALVE')">Close Valve</button>
        <button @click="send('REMOVE_OIL')">Transfer To Labeling</button>
      </div>
    </div>

  <div class="labeling-wrapper">
    <div class="barrel">
      <img src="@/assets/barrel_full.png"/>
    </div>
    <input type="text" placeholder="Serial No."/>
  </div>

  <div class="labeling-actions">
    <button @click="send('CLOSE_VALVE')">Stamp Label</button>
    <button @click="send('CLOSE_VALVE')">Send Barrel</button>
  </div>
</div>
</template>

  <script>
  import { useMachine } from '@xstate/vue';
  import { parallelLabelingMachine } from '../xstate/3-parallel-labeling.xstate';

  export default {
    setup() {
      const { state, send } = useMachine(parallelLabelingMachine);
      return {
        state,
        send
      };
    },
    methods: {     
        sendPump() {
            this.send('Pump');
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

.actions > * {
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
  bottom: 71px;
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
</style>