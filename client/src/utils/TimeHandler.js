export const msToMinutes = (ms) => {
    let duration = ~~(ms / 1000);
    let seconds = duration % 60;
    let minutes = ~~(duration / 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}