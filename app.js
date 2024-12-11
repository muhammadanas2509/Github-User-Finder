const input = document.getElementById('searchInput');
const main = document.getElementById('userProfile');
const search = () => {
    main.innerHTML = `<span class="loader"></span>`;
    main.style.display = "flex"
    main.style.justifyContent = "center"
     main.style.alignItems = "center"
    if(input.value === ""){
         main.innerHTML = `<p>Please enter a github username.</p>`
    } 
    else{
           
    const API_URL = `https://api.github.com/users/${input.value}`;
    const REPO_URL = `https://api.github.com/users/${input.value}/repos?sort=updated&per_page=5`;

    fetch(API_URL)
        .then((res) =>{ 
            
            return res.json()
        
        })
        .then((data) => {
            console.log(data)
             main.style.display = "block"
            main.innerHTML = `
            <div class="profile-card">
               <div class="profile-image">
                   <img id="profilePicture" src="${data.avatar_url}" alt="Profile Picture">
               </div>
               <div class="profile-details">
                   <h2 id="name">Name: ${data.name || "Not Found"}</h2>
                   <p id="username">Username: ${data.login || "Not Found"}</p>
                   <p id="bio">Bio: ${data.bio || "Not Found"}</p>
                   <p id="email">Email: ${data.email || "Not Found"}</p>
                   <p id="company">Company: ${data.company || "Not Found"}</p>
               </div>
               <div class="profile-stats">
                   <div class="stat">
                       <h3>Followers</h3>
                       <p id="followers">${data.followers}</p>
                   </div>
                   <div class="stat">
                       <h3>Following</h3>
                       <p id="following">${data.following}</p>
                   </div>
                   <div class="stat">
                       <h3>Repos</h3>
                       <p id="totalRepos">${data.public_repos || "Not Found"}</p>
                   </div>
               </div>
               <div class="latest-repo">
                   <h3>Latest Repos:</h3>
                   <div id="latestRepos"> </div>
               </div>
               <a id="profileUrl" href="${data.html_url}" target="_blank" class="profile-link">View GitHub Profile</a>
           </div>
           `;

            // Fetch repositories and update the latest repos
            return fetch(REPO_URL);
        })
        .then((res) => res.json())
        .then((repos) => {
            const latestReposList = document.getElementById('latestRepos');
            if (latestReposList) {
                latestReposList.innerHTML = repos.map(repo => `
                     <button class="latestRepos"><a href="${repo.html_url}" target="_blank">${repo.name}</a></button>
                `).join('');
            }
        })
            
        .catch((error) => {
            
             main.innerHTML = `<p>User Not Found</p>`
           ;
        });
    }
    //   input = document.getElementById('searchInput').value = "";
};
