function ProgressBar({ part, total }) {
    return <div className={"progress-bar"}>
        <div className={"progress-bar-fill"} style={{width: `${part/total * 100}%`, height: "100%"}}></div>
    </div>
}

export default ProgressBar;