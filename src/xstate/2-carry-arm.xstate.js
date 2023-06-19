import { createMachine, assign } from "xstate";

export const carryArmMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAndBPAgugtgLKrIAWAlgHZgB0AkhADZgDEAKgKoBKAcgPo4uhPgHkeAbQAMAXUSgADgHtY5AC7lFlOSAAeiALQBOAGw1DhgIwB2SVYuGAzABZjADgBMTgDQgsBiwCskjSurhbGTg4WTvaGku4Avgk+aJi4BMRkVLR4+DQA6qhqVFAsAAp0AMIA0nwcZVKySCBKKuqa2noI7uY0DoZ2Ae5WDpKSMQM+fggWFq4hkY7xTu4BVsMWSSkY2LmZFNQ0uTRl5MgA1iUABBzyVwBCO2CM5RxsfHT8bFwcNY3arWKHWaXR67j6VkhVjiATiHgCU0QkVMNlc42cNkMLmcWxAqV2GRIBxyBBoj0wzyudEoVzY6AArhdylVavV-s1Ae0tCDELMaMYAq4nGiAsZbJJzMYLIiEDEHDQRoELLZQu53JIHLj8ekiETskdSeT0JTqbSGUyAGKfOgAZQAEuyFMogdzQF1rAEaGNVtDXIKXOMEb5EFZjKYBkEomH4sZIUlkiBKIoIHBtNq9nrqADnVzOgZVvMsRZ+mGbE4sUKZfp3A55rXwm5IQEnJJi1qdjr9vqGMxs20NK7dPnlWY5SZY+MK95gwh9FF+aGfWtoQMHKH22kM1lDrk+y687OHKZnEqsf0emNp9MLArla2LGqNZDJAEAhuCbrtyS8oVipQoHuuY8ggvQCg47gCuW9hBK4hgyrBNDuHer7rOMxgOGs76dpm34nGclz-jcdxGs8gEDgeozgqEyqGBBKzekG0zgZ6ViuKWr4CkM5hvgm6aEl+Bp5CRjBUjSdKMucZHAm6iDuGit4PmuEE1v00ozsYPQ0LCTiKh49gSk4WFbsSNAADKKKgEDXBaVDkLApCQFJg5dFEhheusLathEtiGK4MrQlYiEaeKxZIbBhnxkAA */
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