const userFormEl = document.querySelector("#user-form");
const languageButtonsEl = document.querySelector("#language-buttons");

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

    fetch(apiURL).then(function(response) {
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
};

const getFeaturedRepos = function(language) {
    
    const apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    
    fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data.items, language)
                });
            } else {
                alert('Error: GitHub User Not Found');
            }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
};


const displayRepos = function(repos, searchTerm) {  
   
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repositories found."
    }
    // console.log("here");

    // console.log(repos);

    for (let i = 0; i < repos.length; i++) {
        const repoName = repos[i].owner.login + "/" + repos[i].name;

        const repoEl = document.createElement("a");
        
        const titleEl = document.createElement("span");
        const statusEl = document.createElement("span");
                
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        
        titleEl.textContent = repoName;
        
        repoEl.appendChild(titleEl);
        
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
};

const buttonClickHandler = function(event) {

    const language = event.target.getAttribute("data-language");
    
    if(language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent = "";
    }


}

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);

// Lett off @ 6.3.1
