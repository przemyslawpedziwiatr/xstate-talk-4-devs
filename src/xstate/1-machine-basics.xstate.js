import { createMachine } from "xstate";

export const barrelPipeOilFlowMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCGAndYA2AFAlgA5gDy+2AYtgPYDuAdAKIC2hALgJ4DEJujAcgH0AagEEAMsMYBtAAwBdRKELVY+NvmoA7JSAAeiAIyzZ9AKwB2AByGATGYA0IDogsA2em7cWAnG6sWZgC+QU5omDgExGSUNAwAQhhY2AAEFOTY+FpQKQCqhFwASowAsiRSgiQAkuJyikggKmoa2roGCIZmACz0Vl2ybj5mbrIAzP0Wtm5OLgi2xvSjgbJdVm5dZrK2gSFhSZFEpORUdPSJEanp2JnZeQUAwuIkAMqMIhJSdbpN6po6De0zGZDPRZH0fJ0uqNhnZbDNEEt6F0LF1DH0LMYVlYfLZdiBwskokdYqcKABXa4pc7JIqlcpvaq1BTfVS-VoAxC2KFI7ZWLmGTpubY+CzwuZDejuUZuQw+MFDGzdEKhEBaagQOC6AkHaLHOIs5p-NqIAC0ZlGvWBw3sYrNpi2ZhsPhxo15nTx2rwhxiJwYLHYs2UrJa-1A7TNlsFNuciG89Fl5rswRVnqJPriZ32lwyWRy+QNbND+gRox8oK6-SmIymVjMfjFiORqPRmNWOI9WbTetJFNS1JwBZDxoQQNMtdk5oryICfLFtlkZaTJnGjuRbmVQSAA */
    id: 'barrelPipeOilFlow',
    initial: 'Empty',
    states: {
        Empty: {
            on: {
                OPEN_VALVE: "Barrel Filling Up"
            }
        },
        "Barrel Filling Up": {
            on: {
                REMOVE_OIL: "Empty",
                CLOSE_VALVE: "Full Barrel"
            }
        },

        "Full Barrel": {
            // type: 'final',
            on: {
                REMOVE_OIL: "Empty"
            }
        }
    },
})