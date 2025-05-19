// import {useEffect} from "react";

function PlaybackDisplay({ bgColor, data, setTrackId }) {
    return <div style={{
        backgroundColor: bgColor,
    }} className={"playback-display"}>
        <div className={"track-details"}>
            <img src={data.item.album_images[1].url}/>
            <div className={"track-info"}>
                <b style={{margin: "10px 0"}}>{data.item.track_name}</b>
                <p>{data.item.album_name}</p>
                <p>{data.item.artists.map((artist) => (
                    artist.artist_name
                )).join(", ")}</p>
                <p style={{fontSize: "12px"}}>{new Date(data.item.release_date).toLocaleDateString("it")}</p>
            </div>
        </div>
    </div>
}

export default PlaybackDisplay;