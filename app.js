const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

sendButton.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const reply = await getAIResponse(text);
  addMessage(reply, "bot");
});

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function getAIResponse(userText) {
  try {
    // ここをあなたのVercelのAPI URLに変更
    const response = await fetch("https://apikeytaiwa.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "AIからの返答がありませんでした。";
  } catch (error) {
    console.error(error);
    return "通信エラーが発生しました。";
  }
}
