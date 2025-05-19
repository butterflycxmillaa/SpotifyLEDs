import {useEffect} from "react";

function PlaybackDisplay({ bgColor, data, setTrackId}) {
    useEffect(() => {
        console.log(bgColor)
    }, [bgColor])

    return <div style={{
        backgroundColor: bgColor,
    }} className={"playback-display"}>
        <div className={"track-details"}></div>
    </div>
}

export default PlaybackDisplay;