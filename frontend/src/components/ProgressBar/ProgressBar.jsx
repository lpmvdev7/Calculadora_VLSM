import "./ProgressBar.css"

export default function ProgressBar({
  value = 40
}) {
    const percent = Math.min(100, Math.max(0, Number(value) || 0));
    const color = "#4B64CA"

    const fillStyle = {
        width: `${percent}%`,
        height: "100%",
        background: color,
        transition: "width 300ms ease",
    };
 
    return (
        <div
            className="pbar-container"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            // style={trackStyle}
        >
        <div className="pbar-fill" style={fillStyle}/>
        </div>
    );
}