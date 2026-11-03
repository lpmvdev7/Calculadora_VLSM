import ProgressBar from "../../components/ProgressBar/ProgressBar"
import TablaVLSMSubnet from "../../components/TablaVLSMSubnet/TablaVLSMSubnet"
import ExportButtons from "../ExportButtons/ExportButtons"
import InfoCardGrid from "../infoCardGrid/infoCardGrid"
import "./SubnetInfo.css"

export default function SubnetInfo(){
    return(
        <section class="si-layout">
            <InfoCardGrid></InfoCardGrid>
            <div>
                <span>Se cubren el 72% de los hosts disponibles</span>
                <ProgressBar value={72}></ProgressBar>
            </div>
            <TablaVLSMSubnet></TablaVLSMSubnet>
            <ExportButtons></ExportButtons>
        </section>
    )
}