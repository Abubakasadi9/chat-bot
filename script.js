// Register a new user
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        // Store user credentials in localStorage
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);

        alert('Account created successfully! You can now log in.');
        window.location.href = 'index.html';  // Redirect to login page
    } else {
        alert('Please fill in both fields.');
    }
});

// Handle login and redirect to chat page if successful
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if the credentials match
    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('currentUser', username);  // Store the current user
        alert('Login successful!');
        window.location.href = 'chat.html';  // Redirect to chat page
    } else {
        alert('Incorrect username or password.');
    }
});

// Logout function (clear the current user session)
function logout() {
    localStorage.removeItem('currentUser');  // Remove the current user session
    window.location.href = 'index.html';  // Redirect to login page
}

// Simulate user login for chat
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'index.html';  // Redirect to login page if not logged in
}

// Handle sending messages in the chat
function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ sender: currentUser, message: userMessage });
        localStorage.setItem('messages', JSON.stringify(messages));

        displayMessages();  // Display the message
        document.getElementById('userMessage').value = '';  // Clear input
    }
}

// Display all chat messages
function displayMessages() {
    const chatBox = document.getElementById('chatBox');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    chatBox.innerHTML = '';  // Clear the chat box

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        if (msg.sender === currentUser) {
            messageElement.classList.add('user-msg');
        } else {
            messageElement.classList.add('other-user-msg');
        }
        messageElement.textContent = `${msg.sender}: ${msg.message}`;
        chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
}

// Load chat messages on page load
window.onload = displayMessages;