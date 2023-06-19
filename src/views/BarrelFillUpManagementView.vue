<template>

</template>

  <script>
  import { useMachine } from '@xstate/vue';
  import { stateTransitionMachine } from '../xstate/state-transition.xstate';

  export default {
    setup() {
      const { state, send } = useMachine(stateTransitionMachine);
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

</style>