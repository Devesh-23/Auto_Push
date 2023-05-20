document.addEventListener("DOMContentLoaded", function() {
    const pushForm = document.getElementById("pushForm");
    const errorMessage = document.getElementById("errorMessage");
  
    pushForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const filePath = document.getElementById("filePath").value;
      const repositoryName = document.getElementById("repositoryName").value;
  
      // Push code to GitHub repository using the provided file path and repository name
      pushCodeToGitHub(filePath, repositoryName)
        .then(function(response) {
          // Check if code push was successful
          if (response.status === 200) {
            errorMessage.textContent = "Code pushed successfully!";
            errorMessage.style.color = "green";
          } else {
            errorMessage.textContent = "An error occurred while pushing the code. Please try again.";
          }
        })
        .catch(function(error) {
          console.error("Code push error:", error);
          errorMessage.textContent = "An error occurred while pushing the code. Please try again.";
        });
    });
  
    function pushCodeToGitHub(filePath, repositoryName) {
      // Construct the API URL for creating a new file in the repository
      const apiUrl = `https://api.github.com/repos/${repositoryName}/contents/${filePath}`;
  
      // Prepare the request body with the code content and other required parameters
      const requestBody = {
        message: "Pushed code via Auto Push Chrome extension",
        content: btoa("Your code content here"),
        branch: "main"
      };
  
      // Send a request to GitHub API to create a new file in the repository
      return fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
    }
  });
  