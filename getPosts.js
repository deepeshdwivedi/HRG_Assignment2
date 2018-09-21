function send(){  new request().get(" https://jsonplaceholder.typicode.com/posts").then((e)=>{
    console.log(e);
    $.ajax({
        "url":"http://localhost:3000/post/add",
        "method":"post",
        "data":e,
        "success":function(response){
            console.log(response);
            
            var ancher=document.createElement("a");
            ancher.href="localhost:3000/fetchComments.html";
            ancher.text="post data sucessfully fetched , right click here and open me on new teb to go on fetch comment page ";
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