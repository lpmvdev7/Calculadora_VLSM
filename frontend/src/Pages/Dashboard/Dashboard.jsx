import TablaVLSM from "../../components/TablaVLSM/TablaVLSM";
import ExportButtons from "../../Layouts/ExportButtons/ExportButtons";
import InfoCardGrid from "../../Layouts/infoCardGrid/infoCardGrid";
import NetworkGrid from "../../Layouts/NetworkGrid/NetworkGrid";
import { useLocation, useNavigate } from "react-router";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import SubnetInfo from "../../Layouts/SubnetInfo/SubnetInfo";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard(){
    const [vlsm, setVlsm] = useState([])
    const [selectedSubnet, setSelectedSubnet] = useState(null)

    async function getVLSM(){
        try{
            const response = await fetch(
                `${API_URL}/vlsm`,
                {
                    method: "GET"
                }
            )

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const result = await response.json()
            setVlsm(result)

            console.log(result)

        }catch(error){
            console.error("error al consumir la API", error)
        }
    }

    useEffect(()=>{
        getVLSM()
    }, [])

    // return(
    //     <section className="d-page">
    //         <header className="dashboard-header">
    //             <div className="layout-container">
    //                 <InfoCardGrid data={vlsm}></InfoCardGrid>
    //             </div>
    //             <NetworkGrid data={vlsm}></NetworkGrid>
    //         </header>
    //         <TablaVLSM data={vlsm} onSelectSubnet={setSelectedSubnet}></TablaVLSM>
    //         <ExportButtons data={vlsm}></ExportButtons>
    //     </section>
    // )
    return (
        <section className="d-page">

            {selectedSubnet === null ? (
                <>
                    <header className="dashboard-header">
                        <div className="layout-container">
                            <InfoCardGrid data={vlsm} />
                        </div>

                        <NetworkGrid data={vlsm} />
                    </header>

                    <TablaVLSM
                        data={vlsm}
                        onSelectSubnet={setSelectedSubnet}
                    />

                    <ExportButtons data={vlsm} />
                </>
            ) : (
                <SubnetInfo
                    subnet={selectedSubnet}/>
            )}

        </section>
    );
}