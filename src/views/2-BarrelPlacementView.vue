<template>
  <div class="barrel-placement-wrapper">
    <div class="main">
      <div class="barrels" >
        <img v-for="(barrel, index) in barrelsAvailable" v-bind:key="index"
          src="@/assets/barrel_mini.png"
          :style="{ left: `${index*10 + 10}px` }"
          />
      </div>
      <div class="arm">
        <img src="@/assets/arm_l.png" v-if="state.value.Arm === 'Picking Up Barrel'"/>
        <img src="@/assets/arm_m.png" 
          :style="{ opacity: state.value === 'Idle' ? 0.5 : 1 }"
          v-if="state.value.Arm === 'Idle' || state.value.Arm === 'Waiting'"/>
        <img src="@/assets/arm_r.png" v-if="state.value.Arm === 'Barrel In Truck'"/>
      </div>

      <div class="truck">
        <div class="barrels-truck" >
          <img v-for="(barrel, index) in state" v-bind:key="index"
            src="@/assets/barrel_mini.png"
            :style="{ left: `${index*25 + 20}px` }"
            />
        </div>
        <img src="@/assets/truck.png"/>
      </div>
    </div>
    <div class="actions">
      <button v-if="state.value === 'Idle'" @click="send('TURN_ARM_ON')">Turn Arm ON</button>
      <button :disabled="state.value === 'Idle'" @click="send('PICK_UP')">Pick Up Barrel</button>
      <button :disabled="state.value === 'Idle'" @click="send('PUT_IN_TRUCK')">Put Barrel</button>
      <button :disabled="state.value === 'Idle'" @click="send('FINISH')">Finish</button>
    </div>
  </div>
</template>

  <script>
  import { useMachine } from '@xstate/vue';
  import { contextCompoundMachine } from '../xstate/2-context-compound.xstate.js';

  export default {
    setup() {
      const { state, send } = useMachine(contextCompoundMachine, {devTools: true});
      return {
        state,
        send
      };
    },
    computed: {
      barrelsAvailable() {
        return this.state.context.howManyBarrels - this.state.context.barrelsLoaded;
      }
    }
  };
  </script>

<style scoped>
.barrel-placement-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.barrels {
  display: block;
position: relative;
align-self: end;
width: 100px;
height: 100px;
}

.barrels img {
  position: absolute;
  display: block;
}


.main {
  display: flex;
  flex-direction: row;
}

.arm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 120px;
  /* min-height: 350px; */
  margin-bottom: 50px;
}

.arm img {
  width: auto;
  height: auto;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.truck {
  display: flex;
  place-items: end;
  position: relative;
}

.barrels-truck {
  position: absolute;
  bottom: 164px;
  z-index: -1;
  left: 13px;
}

.barrels-truck img {
  position: absolute;
}


.actions > * {
  margin-top: 0.5rem;
}
</style>