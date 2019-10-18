import sa = require('superagent');

export default () => (req, res, next) => {
    let openidConfig = req.config.openid;
    let urls: any = {};
    for(let key of Object.keys(openidConfig.endpoint)){
        urls[key] = openidConfig.endpoint[key]
            .replace("{host}", openidConfig.host.trimEnd("/"))
            .replace("{client_id}", openidConfig.clientId);
    }
    req.openid = {
        url: urls,
        token: async(code: string) => {
            let tokenResponse = await sa.post(urls.token)
                .type("form")
                .send({
                    code: code,
                    client_secret: openidConfig.clientSecret,
                    client_id: openidConfig.clientId,
                    scope: "openid",
                    grant_type: "authorization_code",
                    redirect_uri: req.fullHostUrl.trimEnd("/") + ("/" + openidConfig.redirect).replace("//", "/")
                });
            let accessToken = tokenResponse.body.access_token;
            req.session.openid = {
                ...req.session.openid,
                accessToken: accessToken
            };
            return accessToken;
        },
        userinfo: async() => {
            let callResponse = await sa.get(urls.userinfo)
                .set({
                    "Accept": "application/json",
                    "Authorization": 'bearer ' + req.session.openid.accessToken
                });
            
            // username, firstName, lastName, email, emailVerified, attributes
            let profileResponse = await sa.get(urls.currentProfile)
                .set({
                    "Accept": "application/json",
                    "Authorization": 'bearer ' + req.session.openid.accessToken
                });
            return {
                id: callResponse.body.sub,
                ...profileResponse.body
            };
        },
        introspectToken: async() => {
            let buff = new Buffer(openidConfig.clientId + ":" + openidConfig.clientSecret);
            let base64BasicToken = buff.toString('base64');
            let callResponse = await sa.post(urls.tokenIntrospect)
                .type("form")
                .send({
                    token: req.session.accessToken
                })
                .set("Authorization", "basic " + base64BasicToken);
            return callResponse.body;
        },
        logout: async () => {
            if(req.session.openid && req.session.openid.accessToken){
                await sa.get(urls.logout)
                    .set({
                        "Authorization": "bearer " + req.session.openid.accessToken
                    });
            }
            return;
        }
    };
    next();
};