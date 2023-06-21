<template>
  <div class="barrel-oil-flow-wrapper">
    <div class="pipes">
      <img src="@/assets/pipe_off.png" v-if="state.value !== 'Barrel Filling Up'" />
      <img src="@/assets/pipe_on.png" v-if="state.value === 'Barrel Filling Up'" />
    </div>
    <div class="barrels">
      <img src="@/assets/barrel.png" v-if="state.value == 'Empty'" />
      <img src="@/assets/barrel_full.png" v-if="state.value !== 'Empty'" />
    </div>
    <div class="actions">
      <button @click="send('OPEN_VALVE')">Open Valve</button>
      <button @click="send('CLOSE_VALVE')">Close Valve</button>
      <button @click="send('REMOVE_OIL')">Remove Oil</button>
    </div>
  </div>
</template>

<script>
import { useMachine } from '@xstate/vue';
import { barrelPipeOilFlowMachine } from '../xstate/1-machine-basics.xstate.js';

export default {
  setup() {
    const { state, send } = useMachine(barrelPipeOilFlowMachine, { devTools: true });

    return {
      state,
      send
    }
  },
};
</script>

<style scoped>
.barrel-oil-flow-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.actions>* {
  margin-top: 0.5rem;
}
</style>