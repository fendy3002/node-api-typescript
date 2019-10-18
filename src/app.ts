require('dotenv').config();
import express = require('express');
import {healthcheck} from '@fendy3002/express-helper';

import routes from './routes';

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