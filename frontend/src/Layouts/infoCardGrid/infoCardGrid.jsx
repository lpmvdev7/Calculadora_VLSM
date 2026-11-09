import InfoCard from "../../components/infoCard/InfoCard"
import "./infoCardGrid.css"
export default function InfoCardGrid({data}){

    // Calculando los hosts totales
    let hosts_n = []

    for(let index = 0; index < data.length; index++){
        const elemento = data[index]["numero_hosts"]
        hosts_n.push(elemento)
    }
    let suma_hosts_n = hosts_n.reduce((acumulador, actual)=> acumulador + actual, 0);


    // // Obteniendo el host posible
    let host_p = []
    for(let index = 0; index < data.length; index ++){
        const elemento = data[index]["hosts_posibles"]
        host_p.push(elemento)
    }
    // let mayor = Math.max(...host_p)
    let mayor = host_p.reduce((acumulador, actual)=> acumulador + actual, 0);

    // Obteniendo porcentaje de uso
    let PORCENTAJE_USO = Math.floor((Number(suma_hosts_n) / Number(mayor)) * 100)
    console.log(PORCENTAJE_USO)

    return(
        <div className="icg-container">
                <InfoCard mainData={suma_hosts_n} dataInfo={"HOSTS TOTALES"}></InfoCard>
                <InfoCard mainData={mayor} dataInfo={"HOST POSIBLES"}></InfoCard>
                <InfoCard mainData={PORCENTAJE_USO + "%"} dataInfo={"USO"}></InfoCard>
        </div> 
    )
}