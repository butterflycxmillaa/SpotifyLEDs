import { useEffect, useState} from "react";
import PlaybackDisplay from "../../src/assets/PlaybackDisplay.jsx";

function PlaybackReader() {
    const [updated, setUpdated] = useState(false)
    const [image, setImage] = useState(null)
    const [trackId, setTrackId] = useState(null)
    const [playback, setPlayback] = useState({})
    
    useEffect(() => {
        const fetchPlayback = async () => {
            let response = await fetch("http://localhost:3000/api/playback", {
                credentials: 'include'
            })
            if(response.status === 401) {
                let url = window.location.href
                window.location.href = (`http://localhost:3000/token?redirect=${
                    encodeURIComponent(url)
                }`)
            }
            let data = await response.json()
            if(data.code === 204) {
                setPlayback({})
                setTrackId(null)
                setImage("")
            }
            else if(data.code !== 200) {
                window.location.href = `http://localhost:5173/error?error=${
                    encodeURIComponent('An error occurred while fetching the playback data')
                }`
            }
            else {
                setPlayback(data.data)
                setTrackId(data.data.item.track_id)
                setImage(data.data.item.album_images[1].url)
                // setTimeout(fetchPlayback, 2000)
                setTimeout(fetchPlayback, data.data.item.duration_ms - data.data.progress_ms + data.data.latency)
            }
        }

        fetchPlayback()
    }, [])

    useEffect(() => {
        console.log("p",playback)
    }, [playback]);

    useEffect(() => {
        console.log("t", trackId)
    }, [trackId]);

    return <><div className={"playback-reader"} style={{
        backgroundImage: `url(${image})`
    }}>
        {
            trackId ?
            <PlaybackDisplay bgColor={"black"} data={playback} setTrackId={setTrackId}/> :
                <p>Non c'è niente in riproduzione</p>
        }
    </div></>
}

export default PlaybackReader;