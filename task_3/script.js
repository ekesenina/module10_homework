const wsUri = "wss://echo-ws-service.herokuapp.com";
const messageInput = document.querySelector('.message');
const sendBtn = document.querySelector('.j-btn-message');
const textWindow = document.querySelector('.text-window');
const geoBtn = document.querySelector('.j-btn-geo');

let websocket = new WebSocket(wsUri); 

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};

websocket.onerror = function(evt) {
    console.log(evt.data)
};

websocket.onmessage = function(evt) {
  console.log(evt.data);
  addMessage(evt.data, 'flex-start');
};

sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    websocket.send(message);
    addMessage(message);
    messageInput.value = ''
})

function addMessage(message, position='flex-end') {
    let element = `
        <p class='message-window' style='align-self: ${position}'>
            ${message}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
</svg>
        </p>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
}


const error = () => {
    let error = "Позиция не может быть определена" 
    addMessage(error);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link)
}


function addLink(link) {
    let element = `<div class='geolocation'>
    <p>Ваше местоположение:</p>
    <a  href='${link}'
        target='_blank'
        class='geolocation_link'>
        Открыть карту
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="svg" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
        </a>
        </div>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
};


geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("You can't use geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});