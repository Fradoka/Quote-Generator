
// defining DOM elements and global variables

const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const checkBox = document.querySelector("#autoOnOff");
const onOffDisplay = document.querySelector("#onOff");
const addQuoteForm = document.querySelector("#add-quote-form");
const newQuoteInput = document.querySelector("#new-quote-text");
const newAuthorInput = document.querySelector("#new-quote-author");
const addQuoteButton = document.querySelector("#add-quote-button");
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

async function addQuote(event) {
  event.preventDefault();

  const newQuote = newQuoteInput.value.trim();
  const newAuthor = newAuthorInput.value.trim();

  if (newQuote && newAuthor) {
    try {
      const response = await fetch("https://fradoka-quote-generator-backend.hosting.codeyourfuture.io", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quote: newQuote,
          author: newAuthor
        })
      });

      const data = await response.json(); 
      if (!response.ok) {
      // show backend error
        throw new Error(data.error || "Failed to add quote");
      }
      console.log("Quote saved:", data);

      // Reset fields after successful save
      newQuoteInput.value = "";
      newAuthorInput.value = "";

      alert("Quote added successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  } else {
    alert("Please fill in both fields.");
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
addQuoteForm.addEventListener("submit", addQuote); 
