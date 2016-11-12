/**
 * Created by Daniil on 12.11.2016.
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch';
import _ from "lodash";

const app = express();
app.use(cors());
app.use(bodyParser());
app.use((req, res, next) => {
    console.log("url: ", req.url);
    next();
});

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
    .then(async (res) => {
        pc = await res.json();
    })
    .catch(err => {
        console.log('Чтото пошло не так:', err);
    });

app.get('/', (req, res) => {
    return res.json(pc);
});

app.get('/:param', (req, res) => {
    if(!pc[req.params.param] && req.params.param != 'volumes' && !req.params.param){
        return res.status(404).send('Not found');
    }

    switch(req.params.param) {
        case 'ram' : {
            return res.json(pc.ram);
        }
        case 'os': {
            return res.json(pc.os);
        }
        case 'floppy' : {
            return res.json(pc.floppy);
        }
        case 'hdd': {
            return res.json(pc.hdd);
        }
        case 'monitor': {
            return res.json(pc.monitor);
        }
        case 'board': {
            return res.json(pc.board);
        }
        case 'volumes': {
            const sum = _(pc.hdd)
                .groupBy('volume')
                .map((v, k) => ({
                    volume: k,
                    size:  _.sumBy(v, 'size')
                })).value();
            return res.json(    {
                "C:" : `${sum[0].size}B`,
                "D:" : `${sum[1].size}B`
            });
        }
    }

    return res.status(404).send('Not found');
});

app.get('/:prop1/:prop2', (req, res) => {
    if(!pc[req.params.prop1] || !pc[req.params.prop1][req.params.prop2]) {
        return res.status(404).send('Not found');
    }

    switch(req.params.prop1) {
        case 'floppy': {
            return res.json(pc.floppy[req.params.prop2]);
        }
        case 'board': {
            return res.json(pc.board[req.params.prop2]);
        }
        case 'os': {
            return res.json(pc.os[req.params.prop2]);
        }
        case 'hdd': {
            return res.json(pc.hdd[req.params.prop2]);
        }
        case 'monitor': {
            return res.json(pc.monitor[req.params.prop2]);
        }
        case 'ram': {
            return res.json(pc.ram[req.params.prop2]);
        }
    }
    return res.status(404).send('Not found');
});

app.get('/floppy/:prop', (req, res) => {
    if(req.params.prop) {
        return res.json(pc.floppy[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }

});
app.get('/board/:prop', (req, res) => {
    if(req.params.prop) {
        return res.json(pc.board[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }
});
app.get('/os/:prop', (req, res) => {
    if(req.params.prop) {
        return res.json(pc.os[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }
});
app.get('/hdd/:prop', (req, res) => {
    if(req.params.prop && pc.hdd[req.params.prop]) {
        return res.json(pc.hdd[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }
});

app.get('/monitor/:prop', (req, res) => {
    if(req.params.prop) {
        return res.json(pc.monitor[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }
});

app.get('/ram/:prop', (req, res) => {
    if(req.params.prop) {
        return res.json(pc.ram[req.params.prop]);
    } else {
        return res.status(404).send('Not found');
    }
});

app.get('/hdd/:propNumber/:propName', (req, res) => {
    if(pc.hdd[+req.params.propNumber] && req.params.propNumber && req.params.propName) {
        console.log(pc.hdd[+req.params.propNumber][req.params.propName]);
        return res.json(pc.hdd[+req.params.propNumber][req.params.propName]);
    } else {
        return res.status(404).send('Not found');
    }
});

app.listen(3000, () => {
    console.log('pets rdy');
});