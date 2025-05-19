import { pickAverageColor } from "../../src/utils/ColorPicker.js";
import { useEffect, useState} from "react";
import PlaybackDisplay from "../../src/assets/PlaybackDisplay.jsx";

function PlaybackReader() {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)
    const [trackId, setTrackId] = useState(null)
    const [playback, setPlayback] = useState({})
    const [color, setColor] = useState({
        R: 0,
        G: 0,
        B: 0
    })
    
    useEffect(() => {
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
            }
            else if(data.code !== 200) {
                window.location.href = `http://localhost:5173/error?error=${
                    encodeURIComponent('An error occurred while fetching the playback data')
                }`
            }
            else {
                setPlayback(data.data)
                setLoading(false)
                setTrackId(data.data.item.track_id)
                setImage(data.data.item.album_images[0].url)
                setTimeout(() => {
                    setLoading(true)
                    fetchPlayback()
                }, data.data.item.duration_ms - data.data.progress_ms + data.data.latency)
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

    useEffect(() => {
        const getColor = async () => {
            let imageElem = document.getElementById("image")
            let color = await pickAverageColor(imageElem, 4)
            console.log(color)
            return color
        }

        getColor().then((color) => {
            setColor(color)
        })
    }, [image])

    return <><div className={"playback-reader"} style={{
        backgroundImage: `url(${image})`,
        backgroundColor: `rgb(${color['R']},${color['G']},${color['B']})`
    }}>
        <img id={"image"} src={image} width={640} height={640} style={{
            display: "none"
        }} crossOrigin={"on"}></img>
        {
            trackId ?
            <PlaybackDisplay bgColor={`rgb(${color['R']},${color['G']},${color['B']})`}
                             data={playback} setTrackId={setTrackId}/> :
                <p>Non c'è niente in riproduzione</p>
        }
    </div></>
}

export default PlaybackReader;