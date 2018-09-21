"use strict";
exports.__esModule = true;
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
            var collection = db.collection("posts");
            collection.insertMany(data, function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    client.close();
                    exports.Posts = data;
                    resolve("success");
                }
                ;
            });
        });
    });
    return promise;
}
exports.addData = addData;
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
            var collection = db.collection("posts");
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
            var collection = db.collection("posts");
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
function getByUserId(id) {
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
            var collection = db.collection("posts");
            console.log(id);
            collection.find({ "userId": id }).toArray(function (err, result) {
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
exports.getByUserId = getByUserId;
function addCommentData(data) {
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
            var collection = db.collection("posts");
            collection.find().toArray(function (err, result) {
                if (err) {
                    client.close();
                    reject(err);
                }
                else {
                    for (var d in result) {
                        var filData = data.filter(function (e) {
                            if (e.postId == result[d].id)
                                return true;
                            return false;
                        });
                        result[d]["comments"] = filData;
                        collection.update({ id: result[d].id, _id: 0 }, result[d], function (err, res) {
                        });
                    }
                    client.close();
                    exports.Posts = result;
                    resolve("success");
                }
                ;
            });
        });
    });
    return promise;
}
exports.addCommentData = addCommentData;
