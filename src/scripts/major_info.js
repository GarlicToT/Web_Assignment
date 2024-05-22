const messages = [
    "Thanks to the college entrance examination, she has the opportunity to study Artificial Intelligence at UoA and SCNU. If you wonder why she chose this major, she would say she never imagined this situation either. In high school, she wanted to become a biologist.",
    "But taking things as they come, she has been studying AI courses for nearly two years. You cannot say she knows little about this major, but there is indeed a long way to go for her. When she was a freshman, she participated in several (actually only one) programming competitions and got zero awards. Yet she achieved good results in the Math Modeling Competition as a programmer.",
    "Now, as a sophomore, she has become stronger, taking on the role of project leader for two projects: one about computer vision (CV) and another about deep learning.",
    "Sometimes, late at night, she wonders what it would be like if she pursued biology, as per her seventeen-year-old dreams."
];

let messageIndex = 0;

function typeMessage(message, element, callback) {
    let i = 0;
    const interval = setInterval(() => {
        element.innerHTML += message[i];
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 10); // Adjust typing speed here
}

function sendMessage() {
    const inputContainer = document.querySelector('.input-container');
    const inputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    const chatContainer = document.getElementById('chat-container');
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.innerHTML = `<div class="message-content">${inputField.value}</div>`;
    chatContainer.appendChild(userMessage);

    inputField.value = "";
    inputField.placeholder = "";
    sendButton.disabled = true;

    setTimeout(() => {
        showNextMessage();
    }, 1000); // Delay before GPT response
}

function showNextMessage() {
    if (messageIndex < messages.length) {
        const chatContainer = document.getElementById('chat-container');
        const gptMessage = document.createElement('div');
        gptMessage.classList.add('chat-message', 'gpt-message');
        gptMessage.innerHTML = `
            <div class="avatar-wrapper">
                <img src="../images/gpt_avatar.png" alt="GPT Avatar" class="avatar">
            </div>
            <div class="message-content"></div>
        `;
        chatContainer.appendChild(gptMessage);
        
        const messageContent = gptMessage.querySelector('.message-content');
        typeMessage(messages[messageIndex], messageContent, () => {
            messageIndex++;
            setTimeout(showNextMessage, 1000); // Delay between messages
        });
    } else {
        setTimeout(showButtons, 1000);
    }
}

function showButtons() {
    const chatContainer = document.getElementById('chat-container');
    const moreInfoButtons = document.createElement('div');
    moreInfoButtons.classList.add('more-info-buttons');
    moreInfoButtons.innerHTML = `
        <button class="info-button" onclick="location.href='BasicInfo'">Back to Basic Information Page</button>
        <button class="info-button" onclick="location.href='Hobby'">Or See Her Hobby</button>
    `;
    chatContainer.appendChild(moreInfoButtons);
    moreInfoButtons.style.opacity = 0;
    moreInfoButtons.style.transition = 'opacity 1s';
    setTimeout(() => {
        moreInfoButtons.style.opacity = 1;
    }, 100); // Delay for smooth fade-in effect
}
