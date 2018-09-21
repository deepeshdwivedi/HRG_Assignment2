var fileSystemUtilities=require("fs");
var urlUtilities=require("url");
var pathUtilities=require("path");
var httpServerFactory=require("http");
var UserDAO=require("./userDao");
var PostDAO=require("./postDao");
var formidable=require("formidable");
var httpServer=httpServerFactory.createServer();
var imageFolder="/image"
function handleAddRequest(request,response){
    var requestURI=urlUtilities.parse(request.url).pathname;
    console.log(requestURI);
    var currentWorkingFolder=process.cwd();
    console.log(currentWorkingFolder);
    var fullPath=pathUtilities.join(currentWorkingFolder,requestURI);
    console.log(fullPath);
    console.log("Method : "+request.method);
    if(fullPath.endsWith(".html") ||fullPath.endsWith(".js")){
        
        if(fileSystemUtilities.existsSync(fullPath)){ fileSystemUtilities.createReadStream(fullPath).pipe(response);}
        else 
        {
            response.end("invalid requeest");
    }return;
    }
    if (request.method == 'POST')
        {
        if(requestURI.endsWith("user/add")){
        console.log("Request data :"+request.toString());
        var buffer = '';
        request.setEncoding('utf8');
        request.on('data', function(chunk){ buffer += chunk });
        request.on('end', function() {
        var jqlObject=JSON.parse(buffer);
        console.log("Request received : "+JSON.stringify(jqlObject));
        console.log(JSON.stringify(UserDAO));
        UserDAO.addData(jqlObject).then(function(e){
            response.end(JSON.stringify(jqlObject)+"\n");
        }).catch(function(error){
            response.end("error occur  "+error);    
        });
            
    });
    }
    if(requestURI.endsWith("user/addAvatar")){
        console.log("in avatar");
        var form = new formidable.IncomingForm();
          console.log(form);
        form.on("error",function(err){console.log(err);});
        var queryStringParameters;
        form.on("file",function(name,file){
            var oldPath=file.path;
            var newPath=currentWorkingFolder+imageFolder;
            if(!fileSystemUtilities.existsSync(newPath)) fileSystemUtilities.mkdirSync(newPath);
            var newFilePath=newPath+"/"+file.name;
            fileSystemUtilities.rename(oldPath,newFilePath,function(err){
                if(err) console.log(err);
                fileSystemUtilities.createReadStream(oldPath).pipe(fileSystemUtilities.createWriteStream(newFilePath));
                //fileSystemUtilities.unlinkSync(oldPath);
                UserDAO.addAvatar(queryStringParameters["username"],newFilePath).then(function(e){
                    response.end(JSON.stringify(e)+"\n");
                }).catch(function(error){
                    response.end("error occur  "+error);    
                });        
            });
        });
        form.parse(request,function(err,fields,files){
            queryStringParameters=fields;
                        });
    }

    if(requestURI.endsWith("post/add")){
        console.log("Request data :"+request.toString());
        var buffer = '';
        request.setEncoding('utf8');
        request.on('data', function(chunk){ buffer += chunk });
        request.on('end', function() {
        var jqlObject=JSON.parse(buffer);
        console.log("Request received : "+JSON.stringify(jqlObject));
        console.log(JSON.stringify(UserDAO));
        PostDAO.addData(jqlObject).then(function(e){
            response.end(JSON.stringify(jqlObject)+"\n");
        }).catch(function(error){
            response.end("error occur  "+error);    
        });
            
    }); 
    }
    if(requestURI.endsWith("comment/add")){
        console.log("Request data :"+request.toString());
        var buffer = '';
        request.setEncoding('utf8');
        request.on('data', function(chunk){ buffer += chunk });
        request.on('end', function() {
        var jqlObject=JSON.parse(buffer);
        console.log("Request received : "+JSON.stringify(jqlObject));
        console.log(JSON.stringify(UserDAO));
        PostDAO.addCommentData(jqlObject).then(function(e){
            response.end(JSON.stringify(e)+"\n");
        }).catch(function(error){
            response.end("error occur  "+error);    
        });
            
    }); 
    }

    

}// if POST condition ends
else if(request.method=="GET"){
    if(requestURI.endsWith("/getPostByUserName")){
        var queryStringParameters = urlUtilities.parse(request.url,true).query;
        UserDAO.getByUserName(queryStringParameters["username"]).then((e)=>{
            PostDAO.getByUserId(e[0].id).then(function(e){
                for(var i in e){
                    delete e[i]._id;
                }
            response.end(JSON.stringify(e)+"\n");
            }).catch(function(error){
                response.end("error occur  "+error);    
            });
        }).catch((e)=>{
            response.end("error occur  "+error);

        });
        
        

    }
    if(requestURI.endsWith("/getUsers")){
        UserDAO.getAll().then((e)=>{
            for(var i in e)
            {
                delete e[i]._id;
            }
            response.setHeader("content-type","application/json");response.end(JSON.stringify(e)+"\n");
        }).catch((e)=>{
            response.end("error occur  "+error);

        });
        
        

    }
 
}
else{
    response.end("invalid request");

}

}
httpServer.on('request',handleAddRequest);
var portNumber =3000 ;
httpServer.listen(portNumber);
console.log("Server listening at port "+portNumber+"...");