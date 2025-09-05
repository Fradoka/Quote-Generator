
// defining DOM elements and global variables

const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const checkBox = document.querySelector("#autoOnOff");
const onOffDisplay = document.querySelector("#onOff");
let interval;

// Defining Functions to be used

async function resetQuote(){

  try {
    const res = await fetch("https://fradoka-quote-generator-backend.hosting.codeyourfuture.io");
    const data = await res.json();
    quoteText.innerText = `"${data.quote}"`;
    authorText.innerText = `By ${data.author}`;
    console.log("Quote:", data.quote);
    console.log("Author:", data.author);
  } catch (err) {
    console.error(err);
  }
}

function autoPlayer(){
  if (checkBox.checked){
    onOffDisplay.innerText = `Auto-play is On`;
    interval = setInterval(resetQuote, 10000);
  }
  else {
    onOffDisplay.innerText = `Auto-play is Off`;
    clearInterval(interval)
  }
}

// Actions and Event Listeners
resetQuote();
newQuoteBtn.addEventListener("click", resetQuote);
checkBox.addEventListener("change", autoPlayer);
