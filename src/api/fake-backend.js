function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const timeoutPromise = (ms) => {
    return new Promise(resolve => setTimeout(() => {
        resolve({ status: 200, text: 'Barrel moved to truck'})
    }, ms));
}

export const fakeBackendCall = async () => {
    return await timeoutPromise(randomNumber(500,3000));
}
