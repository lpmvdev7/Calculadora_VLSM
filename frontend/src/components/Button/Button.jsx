import "./Button.css"
export default function Button({text, onAction}){
    return(
        <button className="btn-vlsm" type="button" onClick={onAction}> 
            {text}
        </button>
    )
}