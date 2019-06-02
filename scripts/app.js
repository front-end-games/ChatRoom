// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// check local storage for a name
const username = localStorage.username ? localStorage.username : "anonymous"

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render
// every time callback is called we get a single chat object
chatroom.getChats(data =>chatUI.render(data));

// add a new wchat
newChatForm.addEventListener('submit', e=> {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    // show the n hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout( () => updateMssg.innerText ='', 3000);
});

// update rooms
rooms.addEventListener('click', e=> {
    if(e.target.tagName ="BUTTON") {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});



