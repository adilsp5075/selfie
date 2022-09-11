const express = require('express');
const cors = require('cors');
const m = require('./mail');
const mailer = new m.Mailer();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post('/send_mail', async function mailHandler(req, res) {
    //req.Json:mail.sndConfig 
    const sndCfg = req.body;
    const resBody = await mailer.sendMail(sndCfg);
    res.json({ result: resBody })
});

app.listen(port, () => {
    console.log(`Selfie Mail Service listening on port ${port}`)
})