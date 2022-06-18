import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    users.push(req.body);
    console.log(users);
    res.send("OK!");
})

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    const username = tweet.username;
    const avatar = users.find(user => user.username === username);
    
    if(avatar === ""){
        console.log("User nao cadastrado!");
    }else{
        tweet["avatar"] = avatar.avatar;
        console.log("New tweet data: ", tweet);
        tweets.push(tweet);
        res.send("OK!");
    }

})

app.get("/tweets", (req, res) => {
    if(tweets.length <= 10){
        res.send(tweets);
    }else{
        const start = tweets.length - 10;
        const returnedTweets = tweets.slice(start, tweets.length);
        res.send(returnedTweets);
    }
})

app.listen(5000);