const users = [];

// Joins a user
function userJoin(id, username, room) {
    const user = { id, username, room };
    
    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

function userLeave(id) {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave
};