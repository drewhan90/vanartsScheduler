const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});