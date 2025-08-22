process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const path = require('path');
require('dotenv').config();
const schedule = require('node-schedule');
const express = require('express');
const app = new express();
var cors = require('cors');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

const webRouter = require('./router/web/index.js');
app.use(cors('*')); //cho phép mọi front end gọi tới
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: 86400000 * 30
}));
 
app.use('/web', webRouter);

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'dist', 'app.html'))
});

const PORT = parseInt(process.env.PORT);
app.listen(PORT, async () => {
    // Dùng để ngắt service, server sẽ tự sống lại theo cơ chế của docker
    const job = schedule.scheduleJob('1 1 1 * *', () => {
        process.exit();
    });
});