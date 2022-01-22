const userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

const formSubmitHandler = function(event) {
    event.preventDefault();
    const username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);        
    }
    else {
        alert("Please enter a GitHub username")
    }
}

const getUserRepos = function(user) {
    const apiURL = "https://api.github.com/users/"+ user +"/repos"

    fetch(apiURL)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    displayRepos(data, user);  
                });
            } else {
                alert("Error: " + user + " not found!");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        });
}

const displayRepos = function(repos, searchTerm) {  
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repositories found."
    }


    for (let i = 0; i < repos.length; i++) {
        const repoName = repos[i].owner.login + "/" + repos[i].name;
        const repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        const titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        const statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener('submit', formSubmitHandler);

// Lett off @ 6.1.6
