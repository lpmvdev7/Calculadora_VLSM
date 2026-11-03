import "./NetworkGrid.css"
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function NetworkGrid(){
    return (
        <div className="ng-container">
            <h1 className="n-name"><span>RED PRIVADA</span> CLASE B</h1>
            <ProgressBar value={53}></ProgressBar>
        </div>
    )
}