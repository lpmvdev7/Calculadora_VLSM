import InfoCard from "../../components/infoCard/InfoCard"
import "./infoCardGrid.css"
export default function InfoCardGrid(){
    return(
        <div className="icg-container">
            <InfoCard mainData={"545"} dataInfo={"HOSTS TOTALES"}></InfoCard>
            <InfoCard mainData={"1022"} dataInfo={"HOSTS POSIBLES"}></InfoCard>
            <InfoCard mainData={"53%"} dataInfo={"USO"}></InfoCard>
        </div>
    )
}