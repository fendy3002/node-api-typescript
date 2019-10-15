require('dotenv').config();
import express = require('express');
import routes from './routes';
import {healthcheck} from '@fendy3002/express-helper';

const init = async () => {
    let app = express();
    app.use(await routes(app));
    app.use(await healthcheck({
        check: {
            mysql: async () => { return; }
        },
        checkTimeout: 1000
    }));

    return {
        app: app
    };
};

export default init;