const verifyToken = () => {
    if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"))
        return true
    }
    return false
}

export default verifyToken;