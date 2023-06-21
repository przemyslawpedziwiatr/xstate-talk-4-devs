import { createMachine, assign, spawn, sendTo, actions, send } from 'xstate'
import { sendParent } from 'xstate/lib/actions';
const { pure } = actions;

export const barrelPipeOilFlowMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCGAndYA2AFAlgA5gDy+2AYtgPYDuAdAKIC2hALgJ4DEJujAcgH0AagEEAMsMYBtAAwBdRKELVY+NvmoA7JSAAeiAIwAWAOz0ATAE4AbAA5TV43eM2rVi3YA0IDoguyFpYArLJhFvY2UTaGNgC+cT5omDgExGSUNAwAQhhY2AAEFOTY+FpQBQCqhFx6sGyobGD0qABmTegAFIZhsgCUXMn5aaTkVHT0uSmFxdil5VWEcopIICpqGtq6BghmAMz0wRZ7xrK2FiaBhsE+fggBB6ahYSbGhlamdlZ2CUl5qURRpkJhQAK5zApTfJcAAqACVRPwAMq4EhwmGCbKiOFwxjiZa6dbqTQ6VY7faHY6nc6XC43XyIOyGQ69QIRJn2WR7BKJEBaagQOC6IYA9JjLKE1TErZkxAAWhst3lNnorLVatMvxAIrwgIy4wYLHYd2UUs2pNA5IsSoQDkOdj2jpOdjCeyeWp1I31WUm-xmJTKFWqko2JO2iD2smC9A8hjs9isJ1kNlkdnpdwCQSevXZ0Ri8V5nr14pB4MKUJwIelFv0iDcQTsnlTH0ToTTNqsslVDqdzld7p5QA */
  id: 'barrelPipeOilFlow',
  initial: 'Empty',
  states: {
    Empty: {
      on: {
        OPEN_VALVE: {
          target: 'Barrel Filling Up'
        }
      }
    },
    'Barrel Filling Up': {
      after: {
        1000: 'Full Barrel'
      }
    },
    'Full Barrel': {
      on: {
        TRANSPORT_BARREL: {
            after: 1000,
            target: 'Empty',
        }
      },
      exit: sendParent('BARREL_TRANSPORTED')
    }
  }
});

export const multiplePipesMachine = createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFkCuAbALgSwA7rAAIAFPOAOgEkICBiAeWIFEA5AfQDUBBAGQ6YDKAbQAMAXUShcAe1jYc0gHaSQAD0QAmEQHZyIgJzaAbEYAcARgAsl-ZY3GANCACeiAKwbL5S28sBmD31zbV99AF8wpzQsPAISMlgqGjBaLgARNLYuAGEAFXoAJVEJJBAZOQVlUvUEAFpzcw1yP3MjSxFWo30NNsanVwQ3DvJzDw19UyMDfQNzCKiMHHwiUlwKajpcgq4WAWJC3LYAIS4CgqYeYXEVcvlsJRUa+rdzcl8zNqGGkX8NfsRzIZyEEOn4-EZtPp9L43G55iBoks4qt1slaCczhc2FsdnsDkw0sUbrI7g9qgCjE1gvozCF-ggrK8-DNKXDIgjFrEVglyPQ1opILRVLBMABDTBgciigBmEoATgAKcwiFUASloiK58TWiT5YAFECJpVulUeiBaInIZj82lM2m0OnMpjs9OsRitTr84y0zO0DQi7MU0ggcBUmuW2tDxpJpvJdUB+jelg+Pg6yt+9LcfnIphZXsp+mZPj88PDyJ5GzAxIq9yqoBqDV0zOdycsplzInbfnpNrcObchZ0Glzk3BllLnIjKN1-Mg1dJdbUiEsxjegKzbi6DTtpldbRGUMadgdIjctoDYSAA */
      id: 'Multiple Pipes',
      initial: 'Idle',
      context: {
        actors: [],
        barrelsTransported: 0
      },
      states: {
        Idle: {
          on: {
            OPEN_VALVES: {
              target: 'Opened',
              actions: 'sendOpenToAll',
            },
            ADD_ACTOR: {
              target: 'Idle',
              actions: ['addActor']
            },
            TRANSPORT_BARRELS: {
                target: 'Idle',
                actions: 'sendTransportBarrelsToAll'
            },
            BARREL_TRANSPORTED: {
                actions: 'increaseTransportedBarrels',
                target: 'Idle'
            }
          },
        },
        Opened: {
          after: {
            1000: 'Idle',
          },
        },
      },
    },
    {
      actions: {
        addActor: assign((context) => {
          return {
            actors: [...context.actors, spawn(barrelPipeOilFlowMachine)],
          };
        }),
        sendOpenToAll: pure((context) => {
          return context.actors.map((actorRef) => {
            return sendTo( actorRef, { type: 'OPEN_VALVE'});
          });
        }),
        sendTransportBarrelsToAll: pure((context) => {
            return context.actors.map((actorRef) => {
              return sendTo( actorRef, { type: 'TRANSPORT_BARREL'});
            });
          }),
        increaseTransportedBarrels: assign((context) => ({
            barrelsTransported: context.barrelsTransported + 1   
        }))
      },
    }
  );
