"use strict";
exports.__esModule = true;
//import {MongoClient} from "mongodb";
var mongodb = require("mongodb");
function addData(data) {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            collection.insertMany(data, function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve("success");
                }
                ;
            });
        });
    });
    return promise;
}
exports.addData = addData;
function addAvatar(name, filePath) {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            getByUserName(name).then(function (e) {
                e[0]["avatar"] = filePath;
                collection.update({ "username": name }, e[0], function (err, result) {
                    if (err) {
                        client.close();
                        reject(err);
                    }
                    else {
                        client.close();
                        resolve("success");
                    }
                    ;
                });
            });
        });
    });
    return promise;
}
exports.addAvatar = addAvatar;
function add(data) {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            collection.insertOne(data, function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve("success");
                }
                ;
            });
        });
    });
    return promise;
}
exports.add = add;
function getAll() {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            collection.find().toArray(function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve(result);
                }
                ;
            });
        });
    });
    return promise;
}
exports.getAll = getAll;
function getById(id) {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            collection.find({ "id": id }).toArray(function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve(result);
                }
                ;
            });
        });
    });
    return promise;
}
exports.getById = getById;
function getByUserName(name) {
    var promise;
    promise = new Promise(function (resolve, reject) {
        var url = "mongodb://localhost:27017";
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('master');
            if (err) {
                reject(err);
                return;
            }
            var collection = db.collection("users");
            collection.find({ "username": name }).toArray(function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    resolve(result);
                }
                ;
            });
        });
    });
    return promise;
}
exports.getByUserName = getByUserName;
