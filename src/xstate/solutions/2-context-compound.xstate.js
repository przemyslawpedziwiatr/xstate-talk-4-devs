import { createMachine, assign } from "xstate";

export const contextCompoundMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7ALmAHpgwqgLYAOqAruhALICGyAFgJbpgB0AkhADZgDEAFQCqAJQByAfQCCI6hIDyYgNoAGALqJQZWE0xMMmkDkQBGAEwBWNgBYAnPYAcFlQHYAzO5fW3AGhABPRAcTNmcVFRMVexcVCwA2WziAXyS-NCxcAmIyShp6ZlY2KQAnIjYAdVpdFig+AAUOfABpCSE61Q0kEG1qgy7jBDcLFzYnEwt7WxcTJzNrFz9AhGtzUPDYiws3OLcTdwsUtIxsPEJSCio6RhZ2ErK6pmQAaxqAAiESV4AhWmLisG49SEAgkHEkAhEQmaHUMPT0fVAAzscRstl2ZjM5gsDlsFmsi0Q8RCYziFjMLlsKjcZiihxA6ROWXOuSuBVupTYPz+ANeHHQrwExXIz3qjRabRhXTh+nQhgGcRUDjY4RWDgpQ3MHgJCDiq2sDksFhMCRNtgcdIZmTOOUu+RuRQ5XP+3F5-MFwqefAAYmCOABlAASkq0qB08Nl-UQZgcKlGCTMuziDjsMy22vVbDcON2KhpJLcKVSIHQqAgcEMltO2QueWurFhod6EcRiAAtHtRtGTNYzHEElE4hjfAE21ZJma4i44vq1W5rMki5WmTba2zODwwA2wzK5Yge9qDcr1tsXJsVH33Bbjlbqyy7YU7lum7vBrG9qn3G4olSXL-tdSrHWXMVm8XtsSvDIq2ZW063ZMpKmqdAoCfcMXzmNw2FsMxElxUlXBMOdhyWFYMKA4JsNA6YIMZa0a1Ze07jYB5njeD5vl+Z0UJ3SMEDxEJ5yiWx9V7XY0W1HszDYQdnCnGNFXcExqJvaDVwYx0OJ5PkBSFZ4uIRIxEBcJV3ycT9vw8BxtWGEZe2sKITHMOwhgORdrygld6MKAAZVBaAgN4vRYJhYAYSA9ObAzllJUJ3DRLZu3PQc4nTLC2AIuLzCTXFvELJIgA */
    id: 'contextCompoundMachine',
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
                        FINISH: "#contextCompoundMachine.Loading Finished"
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