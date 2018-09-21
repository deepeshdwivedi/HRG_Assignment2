function send(){  new request().get("https://jsonplaceholder.typicode.com/users").then((e)=>{
    console.log(e);
    $.ajax({
        "url":"http://localhost:3000/user/add",
        "method":"post",
        "data":e,
        "success":function(response){
            var ancher=document.createElement("a");
            ancher.href="localhost:3000/fetchPosts.html";
            ancher.text="user data sucessfully fetched , right click here and open me on new teb to go on fetch post page ";
            document.body.appendChild(ancher);
            console.log(response);
        },
        "error":function(error){
            console.log(error);
        }
    });
    }).catch((e)=>{
        console.log(e);
    });}