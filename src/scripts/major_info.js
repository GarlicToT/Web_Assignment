const messages = [
    "Thanks to the college entrance examination, she has the opportunity to study Artificial Intelligence at UoA and SCNU. If you wonder why she chose this major, she would say she never imagined this situation either. In high school, she wanted to become a <strong>biologist</strong>.",
    "But taking things as they come, she has been studying AI courses for nearly two years. You cannot say she knows little about this major, but there is indeed a long way to go for her. When she was a freshman, she participated in several (actually only one) programming competitions and got <strong>zero awards</strong>. Yet she achieved good results in the Math Modeling Competition as a programmer.",
    "Now, as a sophomore, she has become stronger, taking on the role of project leader for two projects: one about computer vision (CV) and another about deep learning.",
    "Sometimes, late at night, she wonders what it would be like if she pursued biology, as per her <strong>seventeen-year-old dreams</strong>."
];

let messageIndex = 0;

function typeMessage(message, element, callback) {
    let i = 0;
    const interval = setInterval(() => {
        element.innerHTML = message.substring(0, i + 1);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 10); // Adjust typing speed here
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

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
<div class="button-container">
<button class="info-button-1" onclick="location.href='BasicInfo'">
    <svg
        id="arrow-horizontal"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="10"
        viewBox="0 0 46 16">
        <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
            ></path>
    </svg>
    <span class="hover-underline-animation"> Back to Basic Information Page </span>
</button>
<button class="info-button-2" onclick="location.href='Hobby'">
    <span class="hover-underline-animation"> Or see her hobby </span>
    <svg
        id="arrow-horizontal"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="10"
        viewBox="0 0 46 16">
        <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"></path>
    </svg>
</button>
</div>
    `;
    chatContainer.appendChild(moreInfoButtons);
    moreInfoButtons.style.opacity = 0;
    moreInfoButtons.style.transition = 'opacity 1s';
    setTimeout(() => {
        moreInfoButtons.style.opacity = 1;
    }, 100); // Delay for smooth fade-in effect
}
