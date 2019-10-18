export default async() => {

    return {

        "openid": {
            "host": process.env.SSO_HOST,
            "clientId": process.env.SSO_CLIENT_ID,
            "clientSecret": process.env.SSO_CLIENT_SECRET,
            "redirect": "/",
            "endpoint": {
                "auth": "{host}/auth/realms/{client_id}/protocol/openid-connect/auth",
                "token": "{host}/auth/realms/{client_id}/protocol/openid-connect/token",
                "tokenIntrospect": "{host}/auth/realms/{client_id}/protocol/openid-connect/token/introspect",
                "userinfo": "{host}/auth/realms/{client_id}/protocol/openid-connect/userinfo",
                "currentProfile": "{host}/auth/realms/{client_id}/account",
                "logout": "{host}/auth/realms/{client_id}/protocol/openid-connect/logout"
            }
        }
    };
};