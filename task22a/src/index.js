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

    const a = +req.query.a;
    const b = +req.query.b;
    if(!isNaN(a + b)) {
      return res.send(String(a + b));
    } else if(!isNaN(a)) {
      return res.send(a);
    } else if(!isNaN(b)) {
      return res.send(b);
    }

});

app.listen(3000, () => {
  console.log('a+b rdy');
});
