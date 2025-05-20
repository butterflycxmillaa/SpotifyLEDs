import ProgressBar from "./ProgressBar.jsx";
import { msToMinutes } from "../utils/TimeHandler.js";
import PlayButton from "../../public/svg/PlayButton.jsx";
import PauseButton from "../../public/svg/PauseButton.jsx";

function PlaybackDisplay({ bgColor, data }) {
    return <div style={{
        backgroundColor: bgColor,
    }} className={"playback-display"}>
        <div className={"track-details"}>
            <img src={data.item.album_images[1].url} crossOrigin="on"/>
            <div className={"track-info"}>
                <b>{data.item.track_name}</b>
                <p>{data.item.album_name}</p>
                <p>{data.item.artists.map((artist) => (
                    artist.artist_name
                )).join(", ")}</p>
                <p style={{fontSize: "12px"}}>{new Date(data.item.release_date).toLocaleDateString("it")}</p>
            </div>
        </div>
        <div className={"track-controls"}>
            <p>{data.device.name}</p>
            {data.isPlaying ? <PauseButton/> : <PlayButton/>}
            <div>
                <p><b>Volume:</b> {data.device.volume}%</p>
            </div>
        </div>
        <div className={"track-progress"}>
            <p>{msToMinutes(data.progress_ms)}</p>
            <ProgressBar part={data.progress_ms} total={data.item.duration_ms} />
            <p>{msToMinutes(data.item.duration_ms)}</p>
        </div>
    </div>
}

export default PlaybackDisplay;