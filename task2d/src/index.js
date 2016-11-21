/**
 * Created by Daniil on 07.11.2016.
 */
import express from 'express';
import color from 'parse-color';
import colorString from 'color-string';
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    if(!req.query.color) {
        return res.send('Invalid color');
    }
    const ree = new RegExp('^(#)?([a-f0-9]{3})?([a-f0-9]{3})', 'i');
    const rgbRe = new RegExp('\\\s*?(rgb)\\\(\\\s*?[0-9]{1,3}\\\s*?,\\\s*?[0-9]{1,3}\\\s*?,\\\s*?[0-9]{1,3}\\\s*?\\\)', 'i');
    const hslRe = new RegExp('^\\\s*?(hsl)\\\(\\\s*?[0-9]{1,3},(%20)*?[0-9]{1,3}(%)?,(%20)*?[0-9]{1,3}(%)?(%20)*?\\\)', 'i');
    const containsAnotherLetters = new RegExp('([g-z])', 'i');
    console.log("url: " + req.url);
    console.log("color: " + req.query.color);
    let result = req.query.color.trim().match(ree);
    let resultStr = req.query.color.trim();
    resultStr = resultStr.replace('#', '');
    console.log('replaced: ' + resultStr);
    console.log(resultStr.match(hslRe));
    if(ree.test(resultStr)
        && !containsAnotherLetters.test(resultStr)
        && resultStr.length < 7
        && resultStr.length != 4) {
        resultStr = resultStr.trim();
        resultStr = `#${resultStr.toLocaleLowerCase()}`;
        console.log("hex: " + resultStr.match(ree));
        if(!result[2]) {
            resultStr = color(resultStr);
        }
        console.log(resultStr);
        if(resultStr.hex) {
            return res.send(resultStr.hex.toLocaleLowerCase());
        } else {
            return res.send(resultStr.toLocaleLowerCase())
        }
    } else if(rgbRe.test(resultStr)) {
        let rgbResult = color(req.query.color.replace(new RegExp(' ', 'g'), ''));
        console.log(rgbResult);
        if(rgbResult.rgb && rgbResult.rgb[0] < 256 && rgbResult.rgb[1] < 256 && rgbResult.rgb[2] < 256 ) {
            return res.send(rgbResult.hex);
        } else {
            return res.send('Invalid color');
        }
    } else if (hslRe.test(resultStr)) {
        let hslRes = color(req.query.color.replace(new RegExp('%20', 'g'), ''));
        const hslMatch = resultStr.match(hslRe);
        console.log("hsl: " + req.query.color.replace(new RegExp('%20', 'g'), ''));
        console.log(hslRes.hsl[1]);
        if(!(hslRes.hsl[1] > 100 || hslRes.hsl[1] < 0) && !(hslRes.hsl[2] > 100 || hslRes.hsl[1] < 0) && hslMatch[3] && hslMatch[5]){
            return res.send(hslRes.hex);
        } else {
            return res.send('Invalid color');
        }
    } else {
        console.log(req.query.color.match(ree));
        return res.send('Invalid color');
    }
});

app.listen(3000, () => {
    console.log('fullname rdy');
});




