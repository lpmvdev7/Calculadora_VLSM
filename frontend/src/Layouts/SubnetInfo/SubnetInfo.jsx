import InfoCard from "../../components/infoCard/InfoCard"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import TablaVLSMSubnet from "../../components/TablaVLSMSubnet/TablaVLSMSubnet"
import ExportButtons from "../ExportButtons/ExportButtons"
import InfoCardGrid from "../infoCardGrid/infoCardGrid"
import "./SubnetInfo.css"

export default function SubnetInfo({subnet, onClose}){
    let subnet_data = []
    subnet_data.push(subnet)

    let PORCENTAJE_USO = Math.floor((Number(subnet.numero_hosts) / Number(subnet.hosts_posibles)) * 100)

    return(
        <div className="si-backdrop" onClick={onClose}>

            <section
                className="si-layout"
                onClick={(e) => e.stopPropagation()}
            >
                <InfoCardGrid data={subnet_data} />

                <div>
                    <span className="span-porce">
                        Se cubren el {PORCENTAJE_USO}% de los hosts disponibles
                    </span>

                    <ProgressBar value={PORCENTAJE_USO} />
                </div>

                <TablaVLSMSubnet data={subnet} />

                <ExportButtons data={subnet_data} />

            </section>

        </div>
    )
}