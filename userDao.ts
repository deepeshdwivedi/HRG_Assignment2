//import {MongoClient} from "mongodb";
var mongodb=require("mongodb");
export function addData(data:any):Promise<any>{
    var promise;
    promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
    var MongoClient=mongodb.MongoClient;  
    MongoClient.connect(url,function(err,client){
    var db=client.db('master');
    if(err){
    reject(err);
    return;
    }
    var collection=db.collection("users");
    collection.insertMany(data,function(err,result){
    if(err) 
    {
        client.close();
        reject(err);
    }
    else {
        client.close();
        resolve("success");
    };
    });
    });
});
return promise;
    }
    export function addAvatar(name:any,filePath:any):Promise<any>{
        var promise;
        promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
        var MongoClient=mongodb.MongoClient;  
        MongoClient.connect(url,function(err,client){
        var db=client.db('master');
        if(err){
        reject(err);
        return;
        }
        var collection=db.collection("users");
        getByUserName(name).then((e)=>{
            
            e[0]["avatar"]=filePath;
        collection.update({"username":name},e[0],function(err,result){
        if(err) 
        {
            client.close();
            reject(err);
        }
        else {
            client.close();
            resolve("success");
        };
        });
        });
    });
    });
    return promise;
        }
    
    export function add(data:any):Promise<any>{
        var promise;
        promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
        var MongoClient=mongodb.MongoClient;  
        MongoClient.connect(url,function(err,client){
        var db=client.db('master');
        if(err){
        reject(err);
        return;
        }
        var collection=db.collection("users");
        collection.insertOne(data,function(err,result){
        if(err) 
        {
            client.close();
            reject(err);
        }
        else {
            client.close();
            resolve("success");
        };
        });
        });
    });
    return promise;
        }
    
    export function getAll():Promise<any>{
        var promise;
        promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
        var MongoClient=mongodb.MongoClient;  
        MongoClient.connect(url,function(err,client){
        var db=client.db('master');
        if(err){
        reject(err);
        return;
        }
        var collection=db.collection("users");
        collection.find().toArray(function(err,result){
        if(err) 
        {
            client.close();
            reject(err);
        }
        else {
            client.close();
            resolve(result);
        };
        });
        });
    });
    return promise;
        }
    
        export function getById(id:number):Promise<any>{
            var promise;
            promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
            var MongoClient=mongodb.MongoClient;  
            MongoClient.connect(url,function(err,client){
            var db=client.db('master');
            if(err){
            reject(err);
            return;
            }
            var collection=db.collection("users");
            
            collection.find({"id":id}).toArray(function(err,result){
            if(err) 
            {
                client.close();
                reject(err);
            }
            else {
                client.close();
                resolve(result);
            };
            });
            });
        });
        return promise;
            }
            export function getByUserName(name:string):Promise<any>{
                var promise;
                promise=new Promise(function(resolve,reject){    var url="mongodb://localhost:27017";
                var MongoClient=mongodb.MongoClient;  
                MongoClient.connect(url,function(err,client){
                var db=client.db('master');
                if(err){
                reject(err);
                return;
                }
                var collection=db.collection("users");
                collection.find({"username":name}).toArray(function(err,result){
                if(err) 
                {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve(result);
                };
                });
                });
            });
            return promise;
                }
    