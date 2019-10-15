import express = require('express');
import routes from './routes';

const init = async () => {
    let app = express();
    app.use(await routes(app));
    
    return {
        app: app
    };
};

export default init;