<!-- <template>
    <div class="pump" @click="sendPump()">
        <img src="@/assets/pump_up.png" v-if="state.value !== 'Fully Pumped'"/>
        <img src="@/assets/pump_down.png" v-if="state.value === 'Fully Pumped'"/>    
    </div>

    <img src="@/assets/baloon.png" class="baloon" :class="{ 
        'baloon-empty': state.value === 'Empty'
    }"/>

    <div class="actions">
        <button v-if="state.value !== 'Pumped And Tied'" @click="send('Deflate')">Deflate</button>
        <button @click="send('Tie')">Tie</button>
    </div>
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

<style>
.pump {
    display: block;
    width: 141px;
    height: 317px;
    cursor: pointer;
    z-index: 2;
}

.baloon {
    transform-origin: bottom center;
    z-index: 1;
    margin-left: 1rem;
    transform: scale(0.9);
    transition: all 0.75s cubic-bezier(0.65, 0.44, 0.97, 0.78) 0s;
}

.baloon-empty {
    transform: scale(0.05);
}

.actions {
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    justify-content: stretch;
}

.actions button {
    cursor: pointer;
}

.baloon-shake {
    animation: shake 0.75s cubic-bezier(.34,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    animation-iteration-count: infinite;
  }
  
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style> -->