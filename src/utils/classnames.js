export const combineCLasses = obj => {
    const result = [];
    for (const className in obj) {
        if (obj[className]) {
            result.push(className);
        }
    }
    return result.join(' ');
};
