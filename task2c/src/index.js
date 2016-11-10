/**
 * Created by Daniil on 07.11.2016.
 */
import express from 'express';
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {

    const ree = new RegExp('((http:\/\/?)?(https:\/\/?)?(www\.)?([a-z0-9-]+?\.)?([a-z0-9-]+?\/))?(\@?[a-z][a-z0-9._]+(?=\/)?)', 'i');
    const username = req.query.username;
    console.log("url" + req.url);
    console.log("result : " + username.match(ree));
    if(username.match(ree)[7].charAt(0) != '@')
        return res.send("@" + username.match(ree)[7]);
    else {
        return res.send(username.match(ree)[7]);
    }

});

app.listen(3000, () => {
    console.log('fullname rdy');
});


