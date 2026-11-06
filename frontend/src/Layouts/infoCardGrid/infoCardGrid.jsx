import InfoCard from "../../components/infoCard/InfoCard"
import "./infoCardGrid.css"
export default function InfoCardGrid({data}){

    // Procesar data del vlsm
    // [
    //   {
    //     "id": 1,
    //     "hosts_posibles": 62,
    //     "numero_hosts": 43,
    //     "prefijo_red": 26,
    //     "mascara": "255.255.255.192",
    //     "rango": {
    //       "First": "192.168.0.0",
    //       "Last": "192.168.0.63"
    //     }
    //   },
    //   {
    //     "id": 2,
    //     "hosts_posibles": 62,
    //     "numero_hosts": 33,
    //     "prefijo_red": 26,
    //     "mascara": "255.255.255.192",
    //     "rango": {
    //       "First": "192.168.0.64",
    //       "Last": "192.168.0.127"
    //     }
    //   },
    //   {
    //     "id": 3,
    //     "hosts_posibles": 6,
    //     "numero_hosts": 3,
    //     "prefijo_red": 29,
    //     "mascara": "255.255.255.248",
    //     "rango": {
    //       "First": "192.168.0.128",
    //       "Last": "192.168.0.135"
    //     }
    //   }
    // ]


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