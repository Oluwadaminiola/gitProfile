const baseUrl = "https://api.github.com/graphql"
const token = "f4ffbcb3a64d757f14a0985868063f7ff0a0fb8f"
const token2 = "c221d82161517301b5422e56f91e35f4b9c038ea"
const query = {
    "query": `query { 
    user(login: "Oluwadaminiola"){
      avatarUrl
      repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}){
        nodes{
          name
          nameWithOwner
          description
          url
          primaryLanguage{
            name
            color
          }
          forkCount
          stargazerCount
          branchProtectionRules{
            totalCount
          }
          isPrivate
          updatedAt
          createdAt
          
        }
      }
    }
  }`
}
const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + token2
}

const getDate = (date) => {
    let month = ""
    let monthNumber = date.getMonth()
    if (monthNumber == 1) {
        month = "Jan"
    } else if (monthNumber == 2) {
        month = "Feb"
    } else if (monthNumber == 3) {
        month = "Mar"
    } else if (monthNumber == 4) {
        month = "April"
    } else if (monthNumber == 5) {
        month = "May"
    } else if (monthNumber == 6) {
        month = "Jun"
    } else if (monthNumber == 7) {
        month = "Jul"
    } else if (monthNumber == 8) {
        month = "Aug"
    } else if (monthNumber == 9) {
        month = "Sep"
    } else if (monthNumber == 10) {
        month = "Oct"
    } else if (monthNumber == 11) {
        month = "Nov"
    } else if (monthNumber == 12) {
        month = "Dec"
    }

    return month + " " + date.getDay()
}


fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query)
})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let repos = data.data.user.repositories.nodes
        document.getElementById("repo-length").innerHTML = `<b>${repos.length}</b> results for <b>all</b> repositories `
        document.getElementById("profile-image").innerHTML = `<img src="${data.data.user.avatarUrl}">`
        document.getElementById("badge").innerHTML = repos.length
        document.getElementById("list").innerHTML = `${repos.map(item => {
            return `
            <div class="repo">
                    <div>
                        <p>
                            <a class="repo-name" href="${item.url}">${item.name}</a> ${item.isPrivate ? `<span class="privacy">Private</span>` : ''}
                        </p>
                        ${item.description ? `<p class="description">${item.description}</p>` : ''}

                        <div class="details">
                            <div>
                                <span><i class="fas fa-circle" style="color: ${item?.primaryLanguage?.color};"></i></span>
                                <span>${item?.primaryLanguage?.name}</span>
                            </div>
                            <div class="star">
                                <span><i class="far fa-star"></i></span>
                                <span>${item.stargazerCount}</span>
                            </div>
                            <div class="branch">
                                <span><i class="fas fa-code-branch"></i></span>
                                <span>${item.branchProtectionRules.totalCount}</span>
                            </div>
                            <div class="update">
                                <span>Updated ${getDate(new Date(item.updatedAt))}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn-star">
                            <span><i class="far fa-star"></i></span>
                            Star
                        </button>
                    </div>
                </div>
            `
        })}`
    })
