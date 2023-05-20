document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const token = document.getElementById("password").value;

    checkCredentials(username, token)
      .then(function(valid) {
        if (valid) {
          window.location.href = "push.html";
        } else {
          errorMessage.textContent = "Invalid credentials. Please try again.";
        }
      })
      .catch(function(error) {
        console.error("Credential check error:", error);
        errorMessage.textContent = "An error occurred while checking credentials. Please try again.";
      });
  });

  function checkCredentials(username, token) {
    const credentials = `${username}:${token}`;
    const encodedCredentials = btoa(credentials);
  
    return fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Check if the response contains the user data
      if (data.login) {
        return true; // Credentials are valid
      } else {
        return false; // Credentials are invalid
      }
    })
    .catch(error => {
      console.error("An error occurred while checking credentials:", error);
      throw error;
    });
  }
});










// document.addEventListener("DOMContentLoaded", function() {
//     const loginForm = document.getElementById("loginForm");
//     const errorMessage = document.getElementById("errorMessage");
  
//     loginForm.addEventListener("submit", function(event) {
//       event.preventDefault();
  
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;
  
//       // TODO: Perform GitHub authentication using username and password
  
//       // Simulate successful login for testing
//       if (username === "your_username" && password === "your_password") {
//         window.location.href = "push.html";
//       } else {
//         errorMessage.textContent = "Wrong credentials. Please try again.";
//       }
//     });
//   });
  
// document.addEventListener("DOMContentLoaded", function() {
//     const loginForm = document.getElementById("loginForm");
//     const errorMessage = document.getElementById("errorMessage");
  
//     loginForm.addEventListener("submit", function(event) {
//       event.preventDefault();
  
//       const username = document.getElementById("username").value;
//       const token = document.getElementById("password").value;
  
//       // Authenticate with GitHub using the provided username and token
//       authenticateWithGitHub(username, token)
//         .then(function(response) {
//           // Check if authentication was successful
//           if (response.status === 200) {
//             window.location.href = "push.html";
//           } else {
//             errorMessage.textContent = "Wrong credentials. Please try again.";
//           }
//         })
//         .catch(function(error) {
//           console.error("Authentication error:", error);
//           errorMessage.textContent = "An error occurred during authentication. Please try again.";
//         });
//     });
  
//     function authenticateWithGitHub(username, token) {
//       // Send a request to GitHub API to verify the credentials
//       return fetch("https://api.github.com/user", {
//         headers: {
//           Authorization: "Basic " + btoa(username + ":" + token)
//         }
//       });
//     }
//   });
  