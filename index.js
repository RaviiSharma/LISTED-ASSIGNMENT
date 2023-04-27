
const { google } = require('googleapis');
const { auth } = require('google-auth-library');

async function authorize() {
  const authClient = await auth.getClient({
    scopes: ['https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.compose'],
  });
  google.options({ auth: authClient });
  return authClient;
}

// Call the authorize() function to get an authorized client.
const authClient = await authorize();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post('/webhooks/email', (req, res) => {
    // Handle incoming email here
    res.sendStatus(200);
  });
  

  async function getAccessToken() {
    const authClient = await authorize();
    const { tokens } = await authClient.getAccessToken();
    return tokens.access_token;
  }

  const { google } = require('googleapis');

async function listMessages() {
  const accessToken = await getAccessToken();
  const gmail = google.gmail({ version: 'v1', auth: accessToken });
  const response = await gmail.users.messages.list({ userId: 'me' });
  return response.data;
}
