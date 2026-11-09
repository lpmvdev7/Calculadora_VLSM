import InfoCard from "../../components/infoCard/InfoCard"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import TablaVLSMSubnet from "../../components/TablaVLSMSubnet/TablaVLSMSubnet"
import ExportButtons from "../ExportButtons/ExportButtons"
import InfoCardGrid from "../infoCardGrid/infoCardGrid"
import "./SubnetInfo.css"

export default function SubnetInfo({subnet}){
    let subnet_data = []
    subnet_data.push(subnet)

    let PORCENTAJE_USO = Math.floor((Number(subnet.numero_hosts) / Number(subnet.hosts_posibles)) * 100)
    return(
        <section class="si-layout">
            <InfoCardGrid data={subnet_data}></InfoCardGrid>
            <div>
                <span>Se cubren el {PORCENTAJE_USO}% de los hosts disponibles</span>
                <ProgressBar value={PORCENTAJE_USO}></ProgressBar>
            </div>
            <TablaVLSMSubnet data={subnet}></TablaVLSMSubnet>
            <ExportButtons data={subnet_data}></ExportButtons>
        </section>
    )
}