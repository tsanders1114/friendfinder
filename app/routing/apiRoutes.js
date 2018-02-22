var friends = require("../data/friends.js");

module.exports = function (app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){
        var topMatch = {
            name:"",
            photo:"",
            friendDifference:1000
        };

        console.log(req.body);

        var friendData = req.body;
        var friendScores = friendData.scores;
         
        console.log(friendScores);

        var completeDifference = 0;
        for(var i =0; i < friends.length; i ++){

            console.log(friends[i]);
            completeDifference = 0;

            for(var j = 0; j < friends[i].scores[j]; j ++){
                completeDifference += Math.abs(parseInt(friendScores[j])-parseInt(friends[i].scores[j]));
                if(completeDifference <= topMatch.friendDifference){
                    topMatch.name = friends[i].name;
                    topMatch.photo = friends[i].photo;
                    topMatch.friendDifference = completeDifference;
                }
            }
        }
        friends.push(friendData);
        res.json(topMatch);
    })
}