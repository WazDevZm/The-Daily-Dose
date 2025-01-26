const startButton = document.getElementById("start-button");
const mainApp = document.querySelector(".main-app");
const welcomeScreen = document.querySelector(".welcome-screen");
const generatePassageButton = document.getElementById("generate-passage");
const passageContainer = document.getElementById("passage-container");
const passageTitle = document.getElementById("passage-title");
const passageText = document.getElementById("passage-text");
const askAIButton = document.getElementById("ask-ai");
const aiResponse = document.getElementById("ai-response");
const userQuestion = document.getElementById("user-question");

// Simulate a Bible API and AI integration
const passages = [
  { title: "John 3:16", text: "For God so loved the world that he gave his one and only Son..." },
  { title: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { title: "Proverbs 3:5", text: "Trust in the Lord with all your heart and lean not on your own understanding." }
];

startButton.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  mainApp.classList.remove("hidden");
});

generatePassageButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * passages.length);
  const passage = passages[randomIndex];
  passageTitle.textContent = passage.title;
  passageText.textContent = passage.text;
});

askAIButton.addEventListener("click", async () => {
  const question = userQuestion.value;
  if (!question.trim()) {
    aiResponse.textContent = "Please enter a question.";
    return;
  }

  const response = await fetch("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", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Provide insights about the following Bible passage: "${passageText.textContent}". Question: ${question}`,
      max_tokens: 150,
      temperature: 0.7
    })
  });

  const data = await response.json();
  aiResponse.textContent = data.choices[0].text.trim();
});
