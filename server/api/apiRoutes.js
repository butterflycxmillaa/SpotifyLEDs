const express = require('express')
const { parseTrack, parseEpisode } = require('../utils/parser')
const router = express.Router()

router.get('/playback', async (req, res) => {
    const access_token = req.cookies.access_token
    let globalTimestamp = new Date()
    let response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if(response.status === 204) {
        return res.status(200).json({
            success: true,
            code: 204,
            data: {
                progress_ms: 0,
                isPlaying: false,
                timestamp: globalTimestamp,
                device: null,
                item: null
            }
        })
    }
    else if(response.status !== 200) {
        return res.status(response.status).json({
            success: false,
            code: response.status,
            data: null
        })
    }
    else {
        let data = await response.json();
        let parseType = data.currently_playing_type;
        if(parseType !== 'track') {
            res.status(200).json({
                success: true,
                code: 204,
                data: {
                    progress_ms: 0,
                    isPlaying: false,
                    timestamp: globalTimestamp,
                    device: null,
                    item: null
                }
            })
        }
        else {
            let item = parseTrack(data.item)
            let timestamp = new Date()
            let latency = timestamp - globalTimestamp
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    progress_ms: data.progress_ms,
                    timestamp: globalTimestamp,
                    latency: latency,
                    device: {
                        name: data.device.name,
                        type: data.device.type,
                        volume: data.device.volume_percent
                    },
                    isPlaying: data.is_playing,
                    item: item
                }
            })
        }
    }
})

module.exports = router;