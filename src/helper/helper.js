const verifyToken = () => {
    if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"))
        return true
    }
    return false
}

const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(array[i] % charactersLength);
    }
    return result;
}


export { verifyToken, generateRandomString };