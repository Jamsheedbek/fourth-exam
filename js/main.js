const $_ = (selector, node = document) => node.querySelector(selector);

const userCount = $_(".user-count");
const postCount = $_(".post-count");
const usersList = $_(".js-users-list");
const postsList = $_(".js-posts-list");
const commentCount =$_(".comment-count");
const commentsList = $_(".js-comments-list");
const usersTemplate = $_("#users-list-template");
const postsTemplate = $_("#posts-list-template");
const commentsTemplate = $_("#comments-list-template")


let creatUsersList = user => {
    let userList = usersTemplate.content.cloneNode(true);
    $_(".user__id", userList).textContent = user.id;
    $_(".user__name", userList).textContent = user.name;
    $_(".user__name", userList).dataset.id = user.id;
    $_(".user__email", userList).textContent = user.email;
    $_(".user__email", userList).href = "mailto:" + user.email;
    $_(".user__country", userList).textContent = user.address['city'];
    $_(".user__company", userList).textContent = user.company['name'];
    $_(".user__website", userList).textContent = user.website;
    $_(".user__website", userList).href = "https://" + user.website;
    return userList;
}

let creatPostsList = post => {
    let postList = postsTemplate.content.cloneNode(true);
    $_(".post__title", postList).textContent = post.title;
    $_(".post__id", postList).textContent = post.userId;
    $_(".post__title", postList).dataset.id = post.id;
    $_(".user__post", postList).textContent = post.body;
    return postList;
}

let creatCommentsList = comment => {
    let commentList = commentsTemplate.content.cloneNode(true);
    $_(".comment__name", commentList).textContent = comment.name;
    $_(".comment__id", commentList).textContent = comment.postId;
    $_(".comment__email", commentList).textContent = comment.email;
    $_(".comment__email", commentList).href = "mailto:" + comment.email;
    $_(".comment__body", commentList).textContent = comment.body;
    return commentList;
}
  
const render = array => {
    userCount.textContent = 'Count of users: ' + array.length;
    array.forEach(element => {
        usersList.appendChild(creatUsersList(element));
    });
}

;(async () => {
    const basicData = await fetch("https://jsonplaceholder.typicode.com/users")
    const cleanData = await basicData.json()
    render(cleanData);
})()

usersList.addEventListener('click', async (evt) => {
    if(evt.target.matches(".user__name")){
        // evt.target.parentNode.classList.add('bg-info', 'bg-opacity-25');
        userId = evt.target.dataset.id;
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        const cleanData = await data.json()
        postCount.textContent = 'Count of posts: ' + cleanData.length;
        postsList.textContent = "";
        cleanData.map(item => {
            postsList.appendChild(creatPostsList(item));
        })
    }
})

postsList.addEventListener("click", async (evt) => {
    if (evt.target.matches(".post__title")) {
        postId = evt.target.dataset.id;
        const data =  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        const cleanData = await data.json()
        commentCount.textContent = "Count of comments: " + cleanData.length;
        commentsList.textContent = "";
        cleanData.map(item => {
            commentsList.appendChild(creatCommentsList(item))
        })
    }
})