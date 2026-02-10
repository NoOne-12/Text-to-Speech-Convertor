const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const speakBtn = document.getElementById("speak-btn");
const downloadBtn = document.getElementById("download-btn");
const historyList = document.getElementById("history-list");
const scheduleBtn = document.getElementById("schedule-btn");
const scheduleTime = document.getElementById("schedule-time");

const synth = window.speechSynthesis;
let voices = [];


function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}


function speakText(text) {
  if (!text.trim()) return alert("Please enter text to speak!");

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);

  synth.speak(utterance);

  addToHistory(text);
}


function addToHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => speakText(text));
  historyList.prepend(li);
}


speakBtn.addEventListener("click", () => speakText(textInput.value));


textInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    speakText(textInput.value);
  }
});


scheduleBtn.addEventListener("click", () => {
  const seconds = parseInt(scheduleTime.value);
  if (!seconds || seconds <= 0) return alert("Enter a valid number of seconds");
  setTimeout(() => speakText(textInput.value), seconds * 1000);
});


downloadBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) return alert("Enter text to download");

  
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);


  synth.speak(utterance);

  alert("Audio download feature is limited due to browser restrictions.\nYou can record using an external tool.");
});
