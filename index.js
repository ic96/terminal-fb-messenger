// entry file for terminal-fb-messenger
"use strict"


const readline = require('readline');
const fs = require('fs');
const login = require('facebook-chat-api');
const initMessenger = require('./src/messenger.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const loggedIn = false;
let credentials;

// TODO: repeat while not valid
// if (fs.existsSync('credentials.json')) {
const promptLogin = () => {
    if (false) {
        credentials = fs.readFileSync('credentials.json', 'utf8');
        login(credentials, (err, api) => {
            if (err) {
                console.log(err);
            } else {
                fs.writeFileSync('credentials.json', JSON.stringify(api.getAppState()));
                initMessenger(api);
            }
        });
    } else {
        rl.question('Please enter your facebook username / email:\n', (username) => {
            rl.question('Please enter your facebook password:\n', (password) => {
                credentials = {
                    email: username,
                    password: password,
                };

                login(credentials, (err, api) => {
                    if (err) {
                        console.log(err);
                        console.log('Please try again, or press Ctrl + C to exit');
                        promptLogin();
                    } else {
                        fs.writeFileSync('credentials.json', JSON.stringify(api.getAppState()));
                        initMessenger(api, rl);
                    }
                });
            });
        });
    }
}

promptLogin();
// login(credentials, (err, api) => {
//     if (err) {
//         console.log(err);
//     } else {
//         fs.writeFileSync('credentials.json', JSON.stringify(api.getAppState()));
//         initMessenger(api);
//     }
// });


