import "./ExportButtons.css"
import Button from "../../components/Button/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import  VlsmPdf  from "../../components/VlsmPdf/VlsmPdf"
import ExportExcel from "../../components/VlsmXlsx/VlsmXlsx";


export default function ExportButtons({data}){
    return(
        <div className="eb-layout">
            <div className="ebb-container">
                <Button text={"Exportar Excel"} onAction={()=> ExportExcel(data)}></Button>
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