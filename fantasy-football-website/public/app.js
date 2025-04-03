// Get elements from the DOM
const leagueIDInput = document.getElementById('leagueID');
const chatDiv = document.getElementById('chat');
const userMessageInput = document.getElementById('userMessage');

// Handle league ID submission
function submitLeagueID() {
    const leagueID = leagueIDInput.value;
    fetch('/getPlayerData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leagueID })
    })
    .then(response => response.json())
    .then(data => {
        // Display player data in the chat (you can customize this)
        chatDiv.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}

// Handle sending a message (chatbot interaction)
function sendMessage() {
    const userMessage = userMessageInput.value;
    const newMessage = document.createElement('div');
    newMessage.textContent = `You: ${userMessage}`;
    chatDiv.appendChild(newMessage);

    // Send message to the backend
    fetch('/askQuestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = document.createElement('div');
        botResponse.textContent = `Bot: ${data.answer}`;
        chatDiv.appendChild(botResponse);
    })
    .catch(error => console.error('Error:', error));

    userMessageInput.value = ''; // Clear input after sending message
}
