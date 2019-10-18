import uuid = require('uuid/v4')
import url = require('url');

export default (req, res, next) => {
    req.id = uuid();
    req.fullHostUrl = url.format({
        protocol: req.protocol,
        host: req.get('host').trimEnd("/") + "/"
    });
}