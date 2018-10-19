const express = require('express');
const app = express();
const port = 3000

// SERVER CONNECTION

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${port}`)
});