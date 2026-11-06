import "./ExportButtons.css"
import Button from "../../components/Button/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import  VlsmPdf  from "../../components/VlsmPdf/VlsmPdf"


export default function ExportButtons({data}){
    return(
        <div className="eb-layout">
            <div className="ebb-container">
                <Button text={"Exportar Excel"}></Button>
            </div>

                <div className="ebb-container">
                    <PDFDownloadLink
                        document={<VlsmPdf data={data}/>}
                        fileName="Reporte-VLSM"
                    >
                        {/* <Button text={"Exportar PDF"}></Button> */}
                        {({ loading }) => (
                            <Button
                                text={loading ? "Generando PDF..." : "Exportar PDF"}
                            />
                        )}
                    </PDFDownloadLink>
                </div>

            {/* <div className="ebb-container">
                <Button text={"Exportar PDF"}></Button>
            </div> */}
        </div>
    )
}