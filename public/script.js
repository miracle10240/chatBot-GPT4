const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "public/bot.svg";
const PERSON_IMG = "public/boris.png";
const BOT_NAME = "GPT4";
const PERSON_NAME = "Boris";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
});

function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    // <div class="msg-info">
    //       <div class="msg-info-name">${name}</div>
    //       <div class="msg-info-time">${formatDate(new Date())}</div>
    //     </div>
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse(result) {
    const msgText = result;
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}
$(document).ready(function () {
    $("#sendButton").click(function () {
        const msgText = msgerInput.value;
        if (!msgText) return;
        const data = { prompt: msgText };
        $.ajax({
            url: '/openai/gpt4',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                console.log(response.result)
                botResponse(response.result);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});