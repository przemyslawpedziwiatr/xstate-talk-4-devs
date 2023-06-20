<template>
  <div class="actions-admin">
    <button @click="send('ADD_ACTOR')">Add Pipe</button>
    <button @click="send('OPEN_VALVES')">Open All Valves</button>
    <button @click="send('TRANSPORT_BARRELS')">Transport All Barrels</button>
    
    <div class="barrels-info">
      <p class="barrels-label">BARRELS</p>
      <p class="barrels-amount">{{ state.context.barrelsTransported }}</p>
    </div>
  </div>

  <div class="barrel-oil-flow-wrapper" v-for="({ state, send }, index) in actors" v-bind:key="index">
    <div class="pipes">
      <img src="@/assets/pipe_off.png" v-if="actorValue(state) !== 'Barrel Filling Up'" />
      <img src="@/assets/pipe_on.png" v-if="actorValue(state) === 'Barrel Filling Up'" />
    </div>
    <div class="barrels">
      <img src="@/assets/barrel.png" v-if="actorValue(state) === 'Empty'" />
      <img src="@/assets/barrel_full.png" v-if="actorValue(state) !== 'Empty'" />
    </div>
    <div class="actions">
      <button @click="send('OPEN_VALVE')">Open Valve</button>
      <button @click="send('TRANSPORT_BARREL')">Transport Barrel</button>
    </div>
  </div>
</template>

<script>
import { useMachine, useActor } from '@xstate/vue';
import { multiplePipesMachine } from '../xstate/4-actor-multiple.xstate';

export default {
  setup() {
    const { state, send } = useMachine(multiplePipesMachine, { devTools: true });
    return {
      state,
      send
    };
  },
  computed: {
    actors() {
      if (this.state && this.state.children) {
        return Object.keys(this.state.children).map(childKey =>
          useActor(this.state.children[childKey]));
      }
      return [];
    },
  },
  methods: {
    actorValue(state) {
      return state.value.value;
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

.actions-admin {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: column;
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

.barrels-info {
  font-weight: bold;
  text-align: center;
}

.barrels-label {
  font-size: 16px;
}

.barrels-amount {
  font-size: 32px;
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