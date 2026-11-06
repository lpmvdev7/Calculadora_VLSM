import "./Button.css"
export default function Button({text, onAction, type}){
    return(
        <button className="btn-vlsm" type={type} onClick={onAction}> 
            {text}
        </button>
    )
}