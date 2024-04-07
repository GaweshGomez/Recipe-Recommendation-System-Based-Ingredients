// Initialize SpeechRecognition object
const recognition = new webkitSpeechRecognition();

// Set parameters for speech recognition
recognition.lang = 'en-US'; // Language for recognition
recognition.continuous = true; // Continuous listening
recognition.interimResults = false; // Results are final

// Function to start speech recognition
function startListening() {
    // Start speech recognition
    recognition.start();
}

// Function to stop speech recognition
function stopListening() {
    // Stop speech recognition
    recognition.stop();
}
readText("Hello, I am your Personal Recipe Recommender and Cooking assistant.        Tell me the ingredients ");

// Event listener for when speech recognition starts
recognition.onstart = function() {
    console.log('Speech recognition activated.');
    // Greet the user

};

// Event listener for when speech is recognized
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    // Check if the user says "Recommend Recipe" and trigger the recommendation process
    triggerRecommendation(transcript);
};

// Function to check if the user says "Recommend Recipe" and trigger the recommendation process
function triggerRecommendation(transcript) {
    const userInput = transcript.toLowerCase();

         // Update the input field with the recognized text
        document.getElementById("ingredientInput").value = transcript;
        if(userInput.includes("recommend recipe")); {
            stopListening(); // Stop listening when "recommend recipe" is detected
            setTimeout(clickRecommendButton, 3000);
            clickRecommendButton(); // Automatically click the "Recommend Recipe" button

    }
}

// Function to simulate a button click event
function clickRecommendButton() {
    document.querySelector('.button1').click();
}

// Function to check if the user says "Object Detection" and navigate to the corresponding web page
function triggerObjectDetection(transcript) {
    const userInput = transcript.toLowerCase();
    if (userInput.includes("object detection")) {
        window.location.href = "objectdetectionapp.html"; // Navigate to the object detection web page
    }
}

// Function to check if the user says "thank you" and navigate to the home page
function triggerThankYou(transcript) {
    const userInput = transcript.toLowerCase();
    if (userInput.includes("thank you")) {
        window.location.href = "index.html"; // Navigate to the home page
    }
}

// Event listener for when speech is recognized
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    triggerRecommendation(transcript); // Check for recommendation trigger
    triggerObjectDetection(transcript); // Check for object detection trigger
     triggerThankYou(transcript); // Check for thank you trigger
}

// Event listener for when speech recognition ends
recognition.onend = function() {
    console.log('Speech recognition ended.');
};

// Function to recommend recipe
function recommendRecipe() {
    const ingredients = document.getElementById("ingredientInput").value;
    fetch('http://127.0.0.1:8000/completions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_query: ingredients }),
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("recommendedRecipe").value = data.response;
        readText(data.response);
    })
    .catch(error => console.error('Error:', error));
}

// Function to read text
function readText(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(utterance);
}

// Start listening when the page loads
document.addEventListener('DOMContentLoaded', function() {
    startListening();
});