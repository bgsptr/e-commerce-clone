import express from "express";
import {google} from "googleapis";
import queryString from "query-string";


const router = express.Router();

const client_id = "44028214963-cejgrrn0jpunef95nuamsaikvl1a5adn.apps.googleusercontent.com";
const client_secret = "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";
const redirect_URI = "http://localhost:3000";

router.get("/", (req, res) => {
    const oauthGoogleClient = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_URI
    );
    
    const authGoogleUrl = oauthGoogleClient.generateAuthUrl({
        access_type: "offline",
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
        include_granted_scopes: true
    });
    res.redirect(authGoogleUrl);
});


export default router;