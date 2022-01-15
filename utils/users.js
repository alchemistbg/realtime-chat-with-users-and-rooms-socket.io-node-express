const users = [];

// Joins a user
function userJoin(id, username, room) {
    const user = { id, username, room };
    
    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find((user) => {
        return user.id === id;
    });
}

function userLeave() {
    
}

module.exports = {
    userJoin,
    getCurrentUser
};