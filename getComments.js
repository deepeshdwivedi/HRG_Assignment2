function send(){  new request().get(" https://jsonplaceholder.typicode.com/comments").then((e)=>{
    console.log(e);
    $.ajax({
        "url":"http://localhost:3000/comment/add",
        "method":"post",
        "data":e,
        "success":function(response){
            var label=document.createElement("label");
            label.innerHTML="comment data sucessfully fetched now go to README file and processed next instructions.";
            document.body.appendChild(label);
            
        },
        "error":function(error){
            console.log(error);
        }
    });
    }).catch((e)=>{
        console.log(e);
    });}