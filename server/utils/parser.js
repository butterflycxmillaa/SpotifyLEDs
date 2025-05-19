const parseTrack = (item) => {
    return {
        duration_ms: item.duration_ms,
        release_date: item.album.release_date,
        album_name: item.album.name,
        album_id: item.album.id,
        album_images: item.album.images.map((img) => ({
            url: img.url
        })),
        artists: item.artists.map((artist) => ({
            artist_id: artist.id,
            artist_name: artist.name
        })),
        track_id: item.id,
        track_name: item.name
    }
}

const parseEpisode = (item) => {
    // da implementare
    return {}
}

module.exports = { parseTrack, parseEpisode }