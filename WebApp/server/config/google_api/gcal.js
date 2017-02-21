var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var eventList = [];
var event;
var exports = module.exports = {};
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = './server/config/google_api/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

var oauth2Client;
// Load client secrets from a local file.

/**
* Create an OAuth2 client with the given credentials, and then execute the
* given callback function.
*
* @param {Object} credentials The authorization client credentials.
* @param {function} callback The callback to call with the authorized client.
*/
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
    });
}

exports.getEvents = function(cb) {
    fs.readFile('./server/config/google_api/client_secret.json', function (err, content) {
        if (err) {
            return;
        }

        // Authorize a client with the loaded credentials, then call the
        // Google Calendar API.
        authorize(JSON.parse(content), function (auth) {
            var calendar = google.calendar('v3');
            var timem = new Date();
            timem.setDate(timem.getDate() - 30);
            calendar.events.list({
                auth: auth,
                calendarId: 'primary',
                timeMin: timem.toISOString(),
                maxResults: 100,
                singleEvents: true,
                orderBy: 'startTime'
            }, function(err, response) {
                if (!err)
                cb(response.items);
            })
        });
    });
};
