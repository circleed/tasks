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

    const ree = new RegExp('^[a-zA-Zа-яА-Яá-žÁ-Ž\']+$');
    const fullName = req.query.fullname;

    if(!fullName) {
        return res.send('Invalid fullname');
    }

    const credentials = fullName
        .replace(new RegExp('^ {1,}'), '')
        .replace(new RegExp(' {1,}', 'g'), '==')
        .replace(new RegExp('==', 'g'), ' ')
        .split(' ');

    credentials.map((item, i) => {
        credentials[i] = credentials[i].toLowerCase().replace(new RegExp('^[a-zA-Zа-яА-Яá-žÁ-Ž]{1,1}'), credentials[i].charAt(0).toUpperCase());
    });
    console.log(credentials);
    if(credentials.length == 0) {
        res.send('Invalid fullname');
    }

    let successMatches;
    switch (credentials.length) {
        case 3 : {
            successMatches = credentials[2].match(ree) && credentials[1].match(ree) && credentials[0].match(ree);
        } break;

        case 2 : {
            successMatches = credentials[1].match(ree) && credentials[0].match(ree);
        } break;

        case 1 : {
            successMatches = Boolean(credentials[0].match(ree));
        }
    }
    if(!successMatches) {
        return res.send('Invalid fullname');
    }

    switch (credentials.length) {
        case 3 : {
            const shortCredentials =
                `${credentials[2]} ${credentials[0].charAt(0)}. ${credentials[1].charAt(0)}.`;
            return res.send(shortCredentials);
        } break;

        case 2: {
            const shortCredentials =
                `${credentials[1]} ${credentials[0].charAt(0)}.`;
            return res.send(shortCredentials);
        } break;

        case 1 : {
            return res.send(req.query.fullname);
        } break;

        default : {
            return res.send('Invalid fullname');
        }
    }

});

app.listen(3000, () => {
    console.log('fullname rdy');
});
