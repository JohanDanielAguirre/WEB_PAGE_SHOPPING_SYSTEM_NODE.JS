const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/ShoppingApp/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'login.html'));
    app.get('/ShoppingApp/:page', (req, res) => {
        let page = req.params.page;
        res.sendFile(path.join(__dirname, 'templates', `${page}`));
    });
});

