require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require("cookie-parser");

const { generateRandom } = require('./utils/generateRandom.js');
const router = require('./api/apiRoutes.js');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

const scope = "user-read-playback-state user-read-private user-read-email"
const oldState = generateRandom(16)

app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify(
        {
           "response_type": 'code',
           "client_id": process.env.CLIENT_ID,
           "scope": scope,
           "redirect_uri": process.env.REDIRECT_URI,
            "state": oldState
        }
        )
    )
})

app.get('/callback', async (req, res) => {
    const {code, state, error} = req.query;

    if(error) {
        return res.status(400).json({
            success: false,
            error: error,
            state: state
        })
    }
    if(state !== oldState) {
        res.status(400).json({
            success: false,
            error: 'state_mismatch',
            state: oldState
        })
    }
    try {
        let response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: querystring.stringify({
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': process.env.REDIRECT_URI,
            })
        })
        let data = await response.json()
        res.cookie('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none'
        })
        res.cookie('access_token', data.access_token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600 * 1000,
            sameSite: 'none'
        })
        res.redirect(`http://localhost:5173/redirect`)
    }
    catch (error) {
        res.redirect(`http://localhost:5173/error?error=${error.message}`)
    }
})

app.get('/token', async (req, res) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    const redirect = req.query.redirect;

    if(refreshToken == undefined) {
        res.redirect('http://localhost:5173/login?' + querystring.stringify({
            'redirect': redirect
        }))
    }
    else {
        // esiste un refresh token
        if(accessToken == undefined) {
            let response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${new Buffer.from(
                        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                    ).toString('base64')}`
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: process.env.CLIENT_ID
                })
            })
            let data = await response.json();
            res.cookie('access_token', data.access_token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600 * 1000,
                sameSite: 'none'
            })
        }
        // crea un session id
        let sessionId = generateRandom(32);
        // reindirizza a login => parametri redirect e sessionId
        res.redirect('http://localhost:5173/login?' + querystring.stringify({
            'redirect': redirect,
            'sessionId': sessionId,
        }));
    }
})

app.use('/api', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})