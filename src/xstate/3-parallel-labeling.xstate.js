import { ref } from 'vue';
import { assign, createMachine } from 'xstate'
import { send } from 'xstate/lib/actions'
import { fakeBackendCall } from '../api/fake-backend'

export const parallelLabelingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCGAnVAbLYsBlUAjPASwDsoBZVAYwAsKwA6AZQBcN2BifAQQCqAOQDCACQDaABgC6iFAHtYpdqQXl5IAB6IAjAGYATM10BWAGyGLADnPmphgOy6ANCACeia7uamp--0MATkdDXUMnAF9ItzRMHDxCEiwKajpGchYAJQBXcnJU5gAhDHQ8ZgBRAFtkdnduAHkABQqhAH0ANT58DorpOSQQZCUVNQ1BnQQI42Dza0cgoIAWS2d9czdPBEtTZlDzC0MV00MHaNiMbFwCYjJKGgYmZlz8wpL0MqxmADFSHFSAAQCZDcLSwTjsFioABmkPQAApdAEAJTcOJXRK3FL3dJPF4FSjFUrlX7-ShA5D9TTDZSqdSaSZ+HxBewspZBPxBfT6TaIVbMCIHUzWfQiwLnIaXBI3ZKpB4ZbJ5AlQIkfEk5HDcAAqWT4QlY3wqWSpgxpo3pE0QTOYLKkbI5du5vIQS2sxgCUl0SykCzsXMcEvR0qSdzSj0yzyVhRD2JVAEkILhuCbFLSxgzEKddn4AqdFo4loXTM7lvpmOZfdZhaFhSLA1LrjG5biI-jo1jChxUDUAXHyMgcjxWFq+FQmimhiM6eNQIynMxvZYK27PSFXB5EMsfEtgo4pEtdItdOFzPX4o2Ozjw4rXoSm4SsmBUBB3ACtQo35hyLBhugeDq9VYJoGiyLUJzNacMwQEVrD2Rx9FMY8FmsFZXRLA8F13fdDyCY9DFPGJJXPTFZSvBVI1vFV73jchP1Qb9fx4CB1BYCgADcFAAaxYIML1IsNyLbO9LxouiGIUP8EHYhRaFQad+nAqd00taDRTghCkKCFDzDQjcEEcKs9nw0xlisE4RX0aJCPIBQIDgakGxI0N5SYaklItWdEAAWicZ0vPMZgPSCoKA0I3inNjFyIy7P83LTDztEQHdnW8G1FkWeZnGsO1DEssLHJlZyWxvZU4vNGdEqmdctn0H1Ao9cIVyzUwzwxQrIuKijlVVT4ysglTzCCZ19GWXwPUcOYpBQ9k8ouYj2uba8ureYkvmqWotlTcqoKQ51EJ8KQTOsDklj3YyuVa4MRKikqVrVL5SVjCk+uUzyEFFKQbTCY6zPMdYrCWZ0lwFYzLGOU5DEuviiqWoSVXeT4fg1LAXoSyZnE+9ZQiOBZatCIa9MQstTCOk6zoOIIoYixbBKjYT+NRirJkGoGtJBg4-qWHMkSWKmFrIvE6aokTmATXBGZ23RHBS-C9j+qR9FCbCJpa-L5uom7lvp0M2E4Hs+wHdgJZU0Vdn0cI-GO8IVmM9DmSwg8jwtvmNc6uHmGo54nxfN8Py1L8fwko3TXcpm+R3Zg3W8GwwmCH07a+kJsKdqwXeut2hY9kW+zEwPYpD+Kw4QY8kRMT0dJM3DQkPFKDF8FlFZOKbcsQqzIiAA */
    id: 'parallelLabelingMachine',
    predictableActionArguments: true,
    initial: 'Start',
    context: {
      barrelsAvailable: 0,
      barrelsSent: 0,
    },
    states: {
      Start: {
        on: {
          LAUNCH: {
            target: 'Running'
          }
        }
      },
      Running: {
        type: 'parallel',
        states: {
          Barrel: {
            initial: 'Empty',
            states: {
              Empty: {
                on: {
                  OPEN_VALVE: 'Filling Up'
                }
              },
              'Filling Up': {
                after: {
                  1000: 'Full'
                }
              },

              Full: {
                on: {
                  TRANSFER: {
                    actions: ['increaseBarrelAmount'],
                    target: 'Empty'
                  }
                }
              }
            }
          },
          Labeling: {
            initial: 'Idle',
            states: {
              Idle: {
                always: {
                  cond: 'isBarrelAvailable',
                  target: 'Stamp Input'
                }
              },
              'Stamp Input': {
                on: {
                  STAMP: {
                    target: 'Ready To Transport'
                  }
                }
              },
              'Ready To Transport': {
                on: {
                  TRANSPORT: {
                    target: 'In Transport'
                  }
                }
              },
							'In Transport': {
								invoke: {
									src: 'transportBarrelToTruckApi',
									onDone: {
										target: 'Idle',
										actions: ['decreaseBarrelAmount', 'clearStampLabel']
									}
								}
							}
            },
          }
        }
      }
    }
  },
  {
    actions: {
      increaseBarrelAmount: assign((context) => ({
        barrelsAvailable: context.barrelsAvailable + 1
      })),
      decreaseBarrelAmount: assign((context) => ({
        barrelsAvailable: context.barrelsAvailable - 1
      }))
    },
    guards: {
      isBarrelAvailable: (context) => context.barrelsAvailable > 0
    },
    services: {
      transportBarrelToTruckApi: () => fakeBackendCall()
    }
  }
)
