const app = require('./app');
const port = 3000;

app.listen(port, () => {
    console.log(`Die App läuft auf port: ${port}`);
});