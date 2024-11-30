import { google } from 'googleapis';

// Create OAuth client with your credentials
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:4000/auth/callback"  // THIS should match the redirect URI in Google Console
);

// Generate OAuth URL for consent screen
const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",  // To get refresh token as well
    scope: [
        'https://www.googleapis.com/auth/youtube.upload',  
        'https://www.googleapis.com/auth/youtube.readonly'
    ]
});

export { authUrl, oauth2Client };
