import TablaVLSM from "../../components/TablaVLSM/TablaVLSM";
import ExportButtons from "../../Layouts/ExportButtons/ExportButtons";
import InfoCardGrid from "../../Layouts/infoCardGrid/infoCardGrid";
import NetworkGrid from "../../Layouts/NetworkGrid/NetworkGrid";
import "./Dashboard.css"

export default function Dashboard(){
    return(
        <section className="d-page">
            <div className="layout-container">
                <InfoCardGrid></InfoCardGrid>
            </div>
            <NetworkGrid></NetworkGrid>
            <TablaVLSM></TablaVLSM>
            <ExportButtons></ExportButtons>
        </section>
    )
}