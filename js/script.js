var api = "https://jsonplaceholder.typicode.com/users";
$(document).ready(function () {
  $.ajax({
    url: api,
    method: "GET",
    success: function (data) {
      var users_list = "";
      for (var i = 0; i < data.length; i++) {
        users_list += `
        <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
        <div class="col-md-4">
          <div class="user-avatar">
            <img src="avatar.png" class="img-responsive" alt="..." />
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">
              <small class="text-muted">${data[i].email}</small>
            </p>
            <div class="buttons" onclick="getUserPosts('${data[i].id}', '${data[i].name}')">
                <a href="#" type="button" class="btn btn-outline-primary">Get User’s Posts</a>
            </div>
          </div>
        </div>
      </div>
      </div>`;
      }
      $("#user-list").html(users_list);
    },
    error: function (e) {
      console.error("error", e);
    },
  });
});
function getUserPosts(id, name) {
  console.log("here", id, name);
  $.ajax({
    url: api + "/" + id + "/posts",
    method: "GET",
    success: function (data) {
      localStorage.setItem("posts", JSON.stringify(data));
      localStorage.setItem("user", name);
      window.location.href = "posts.html";
    },
    error: function (e) {
      console.error("error", e);
    },
  });
}
function loadUserPosts() {
  var user = localStorage.getItem("user");
  var posts = JSON.parse(localStorage.getItem("posts"));
  console.log(posts);
  document.querySelector('.username').innerHTML = user;
  var postArray = "";
  for (var i = 0; i < posts.length; i++) {
    postArray += `
        <div class="col-sm-3">
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">${posts[i].title}</h5>
            <p class="card-text">${posts[i].body}</p>
            </div>
        </div>
        </div>
      `;
  }
  $("#posts").html(postArray);
}
