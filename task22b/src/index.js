/**
 * Created by Daniil on 07.11.2016.
 */
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    const fullName = req.query.fullname;
    const credentials = fullName.split(' ');
    console.log(credentials);
    console.log(credentials.length);
    switch (credentials.length) {
        case 3 : {
            const shortCredentials =
                `${credentials[2]} ${credentials[0].charAt(0)}. ${credentials[1].charAt(0)}.`;
            console.log(shortCredentials);
            return res.send(shortCredentials);
        } break;

        case 2: {
            const shortCredentials =
                `${credentials[1]} ${credentials[0].charAt(0)}.`;
            console.log(shortCredentials);
            return res.send(shortCredentials);
        } break;

        case 1 : {
            console.log(req.query.fullname);
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
