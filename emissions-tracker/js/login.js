let users = []
fetch('../js/login.json')
    .then(response => response.json())
    .then(jsonData => {
        users = jsonData
        const loginBtn = document.getElementById("login")
        loginBtn.addEventListener("click", login)
    })
  .catch(error => {
        console.error('Error reading the JSON file:', error);
});
  
function login(){
    // Get the entered username and password
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const id = usernameInput.value;
    const password = passwordInput.value;
  
    // Check if the entered username and password match any of the users
    const matchedUser = users.find(user => user.id === id && user.password === password);

    if (matchedUser) {
      // Successful login
      displayLoginMessage('Login successful!', 'green')
      let company = users.find(company => company.id === id)
      localStorage.setItem("id", company.id)
      localStorage.setItem("name",company.name)
      location.replace("./html/Home.html")
    } else {
      // Failed login
      displayLoginMessage('Invalid username or password.', 'red');

    }
}
  
// Function to display login messages
function displayLoginMessage(message, color) {
    const loginMessage = document.getElementById('loginMessage');
    loginMessage.textContent = message;
    loginMessage.style.color = color;
  }
  