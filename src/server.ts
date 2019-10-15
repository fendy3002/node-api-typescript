import app from './app';
app().then(({app}) => {
    app.listen(process.env.PORT, () => {
        console.log("App start on " + process.env.PORT);
    });
})