const findUser = (username) => {
    return users.filter(user => user.username == username)
}

let users = [
    {
        username: "Farm",
        password: "1234"
    }
]

module.exports = { findUser, users }