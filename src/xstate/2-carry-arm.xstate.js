import { createMachine, assign } from "xstate";

export const carryArmMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAndBPAgugtgLKrIAWAlgHZgB0AkhADZgDEAKgKoBKAcgPo4uhPgHkeAbQAMAXUSgADgHtY5AC7lFlOSAAeiALQBOAGw1DhgIwB2SVYuGAzABZjADgBMTgDQgsBiwCskjSurhbGTg4WTvaGku4Avgk+aJi4BMRkVLR4+DQA6qhqVFAsAAp0AMIA0nwcZVKySCBKKuqa2noI7u4BNE5W7hHuDpIDUYbuPn4IVlY0AU6eVmGuixaukoZJKRjYuZkU1DS5NGXkyADWJQAEHPI3AEJ7YIzlHGx8dPxsXBw1jW0rWKHWaXXcG36AQcQ1cxgcDjmy2miAchj6TkkxgClhiiMsVh2IFS+wyJCOOQINGemFeNzolBubHQAFcruUqrV6oDmsD2lowQZjO4aENjPFDHCXJIZWsUQhESLIjKAq4rFEsQFCcliXt0kRydkTlSaeg6Qymaz2QAxb50ADKAAkeQplCCBaAutY+jLelZJarpU4AvKrMZTIYrEEouH4sY5kkdZRFBA4NoSfrDtkgW7+Z0DL1XGY8SZ42NDE5XN5fAWHEW6+EBqFjOEok4iRmDobjgxmDm2hoPboCxZghWLGjwzYnBWq-L9FEaPHhVqtf7I4jjB29V2ssdcv33fmEPoLKPRbH3JKIuKZYZ52iFrjMa4HPG5gFsdu0ruKca8oUxSUFAh55oK3R9IMaoBEE4YRJIco1ggAxmAh4pvvCoyuOi36kgae6Unk5xXLc9xPC8jCgYOx49EW6LYh4ELhpMlbyu4Vb9GsPQOEEr5Rg4uGZt2hHUhR9KMsybKXFRoKeog7hYjQKzxrCiISgh8qqkWV4wv6YYDIs2q7D+ZIETQAAyiioBAtzWlQ5CwKQkAyUOXQTDQtieDKja2JKoaRheCk2BOELYe2iZAA */
    id: 'carryArmMachine',

    context: {
        howManyBarrels: 4,
        barrelsLoaded: 0
    },

    states: {
        Idle: {
            on: {
                TURN_ARM_ON : "Arm"
            }
        },

        Arm: {
            initial: "Waiting",
            states: {
                "Waiting": {
                    on: {
                        PICK_UP: "Picking Up Barrel"
                    }
                },
                "Picking Up Barrel": {
                    on: {
                        PUT_IN_TRUCK: {
                            target: "Barrel In Truck",
                        }
                    }
                },
                "Barrel In Truck": {
                    entry: 'increaseBarrelsInTruck',
                    on: {
                        PICK_UP: {
                            target: "Picking Up Barrel",
                        },

                        FINISH: "#carryArmMachine.Loading Finished"
                    }
                }
            }
        },

        "Loading Finished": {
            type: "final"
        }
    },
    initial: "Idle"
}, {
    actions: {
        increaseBarrelsInTruck: assign((context) => ({
            barrelsLoaded: context.barrelsLoaded + 1
        }))
    }
})