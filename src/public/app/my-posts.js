function loadMyPosts() {
  const userId = JSON.parse(window.localStorage.user).id;

  $.get(`/api/posts?userId=${userId}`, (posts) => {
    for (let p of posts) {
      let item = $(`
      <div class="col-4">
        <div class="card m-2">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
            <p class="card-text">
              ${p.body.substr(0, 200)}
              <a href="#">...read more</a>
                          </p>
                          <input type="text" placeholder="add suggestions" class="form-control form-control-sm">
                          <button class="btn btn-primary">Comment</button>  
                          <p class="comment"></p> 
                        </div>
                      </div>
                    </div>   
                `);
      let commentBox = item.find(".comment");
      for (let comment of p.comments) {
        commentBox.append(
          $("<p></p>").text(`${comment.title} => ${comment.body}`)
        );
      }

      item.find(".btn").on("click", () => {
        $.post(
          "/api/comments",
          {
            post_id: p.id,
            comment_body: item.find(".form-control").val(),
            user_id: JSON.parse(window.localStorage.user).id,
          },
          (comment) => {
            $("#content").load(`/components/all-posts.html`);
          }
        );
      });
      $("#posts-container").append(item);
   
    } 
  });
}
