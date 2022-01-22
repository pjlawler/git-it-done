const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");
const repoNameEl = document.querySelector("#repo-name");



const getRepoIssues = function(repo) {
    
    const apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then (function(data) {
                displayIssues(data);

                if(response.headers.get("link")) {
                    displayWarning(repo);
                }

            })
        } else {
            document.location.replace("./index.html");
        }       
    });
};

const displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }
    
    for(let i = 0; i < issues.length; i++) {

        const issueEl = document.createElement("a");

        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        const titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);

        const typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);

    }
}

const displayWarning = function(repo) {

    const repoURL = "https://github.com/" + repo + "/issues"

    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    const linkEl = document.createElement("a");
    linkEl.textContent = repoURL;
    linkEl.setAttribute("href", repoURL);
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

const getRepoName = function() {

    const queryString = document.location.search;
    const repoName = queryString.split("=")[1];

    if(repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);    
    } else {
        document.location.replace("./index.html");
    }
}

getRepoName();


