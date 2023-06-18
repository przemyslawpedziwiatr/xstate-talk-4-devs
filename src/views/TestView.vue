<template>
    <button @click="send('TOGGLE')">
      {{
        state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'
      }}
    </button>
  </template>
  
  <script>
  import { useMachine } from '@xstate/vue';
  import { toggleMachine } from '../xstate/toggle.xstate';

  export default {
    setup() {
      const { state, send } = useMachine(toggleMachine);
      return {
        state,
        send
      };
    }
  };
  </script>