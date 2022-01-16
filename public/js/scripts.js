// console.log("JavaScript was loaded successfully!")

const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");

//Get form data
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();

// Join room
socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputRoomUsers(users);
});

socket.on("message", (message) => {
    // console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    
    const msg = event.target.elements.msg.value;
    socket.emit("chatMessage", msg);

    //Clear input field
    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
});

function outputRoomName(room) {
    const roomName = document.getElementById("room-name");
    roomName.innerText = room;
}

function outputRoomUsers(users) {
    // This is my variant of this function
    // Brad uses innerHTML of the ul and loops through the array using map
    const usersList = document.getElementById("users");
    usersList.innerText = "";
    users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerText = user.username;
        usersList.appendChild(userItem);
    });
}

function outputMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>`;

    document.getElementById("chat-messages").appendChild(messageDiv);
}