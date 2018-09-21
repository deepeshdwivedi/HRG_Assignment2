class request{
public get(url:string):Promise<any>{
var p:Promise<any>=new Promise(function(resolve,reject){
var request=new XMLHttpRequest();
request.onload=function(){
if(request.status==200){
resolve(request.response);
}
else{
    console.log(request.statusText);
    reject(request.statusText);
}
};
request.onerror=function(){
console.log(request.statusText);
reject(request.statusText);
}
request.open("GET",url);
request.send();
});
    return p;
}
}
