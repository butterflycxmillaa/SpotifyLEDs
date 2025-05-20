import {getColor, pickAverageColor} from "../../src/utils/ColorPicker.js";
import { useEffect, useState, useLayoutEffect } from "react";
import PlaybackDisplay from "../../src/assets/PlaybackDisplay.jsx";

function PlaybackReader() {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)
    const [trackId, setTrackId] = useState(null)
    const [progress, setProgress] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [playback, setPlayback] = useState({})
    const [update, setUpdate] = useState(0)
    const [refetch, setRefetch] = useState(0)
    const [color, setColor] = useState({
        R: 0,
        G: 0,
        B: 0
    })

    const fetchPlayback = async () => {
        let response = await fetch("http://localhost:3000/api/playback", {
            credentials: 'include'
        })
        let data = await response.json()
        if(data.code === 401) {
            let url = window.location.href
            window.location.href = (`http://localhost:3000/token?redirect=${
                encodeURIComponent(url)
            }`)
        }
        else if(data.code === 204) {
            setLoading(false)
            setTrackId(null)
        }
        else if(data.code !== 200) {
            window.location.href = `http://localhost:5173/error?error=${
                encodeURIComponent('An error occurred while fetching the playback data')
            }`
        }
        else {
            setPlayback(data.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPlayback()
    }, [])

    useEffect(() => {
        if(playback.item) {
            setTrackId(playback.item.track_id)
            setImage(playback.item.album_images[0].url)
            setPlaying(playback.isPlaying)
            setProgress(playback.progress_ms)
        }
    }, [playback])

    useEffect(() => {
        if(loading) {
            clearInterval(update)
        }
        else {
            let updateInt = setInterval(() => {
                fetchPlayback()
            }, 1000)
            setUpdate(updateInt)
        }
    }, [loading]);

    useEffect(() => {
        if(!playing) {
            clearTimeout(refetch)
        }
        else {
            let timeoutInt = setTimeout(() => {
                setLoading(true)
                fetchPlayback()
            }, playback.item.duration_ms - progress - playback.item.latency)
            setRefetch(timeoutInt)
        }
    }, [playing, trackId])

    return <div className={"playback-reader"} style={{
        backgroundImage: `url(${image})`,
        backgroundColor: `rgb(${color.R},${color.G},${color.B})`
    }}>
        <img
            id="image"
            src={image}
            style={{ display: "none" }}
            crossOrigin="on"
            onLoad={async () => {
                const imgElem = document.getElementById("image");
                const color = await pickAverageColor(imgElem, 4);
                setColor(color);
            }}
        />
        {
            loading ? <p>Loading...</p> :
            (
                trackId ? <PlaybackDisplay bgColor={getColor(color.R, color.G, color.B)} data={playback}
                                           progress={progress} setProgress={setProgress}/> :
                        <p>Non c'è niente in riproduzione</p>
            )
        }
    </div>
}

export default PlaybackReader;