import "./ExportButtons.css"
import Button from "../../components/Button/Button";


export default function ExportButtons(){
    return(
        <div className="eb-layout">
            <div className="ebb-container">
                <Button text={"Exportar Excel"}></Button>
            </div>
            <div className="ebb-container">
                <Button text={"Exportar PDF"}></Button>
            </div>
        </div>
    )
}