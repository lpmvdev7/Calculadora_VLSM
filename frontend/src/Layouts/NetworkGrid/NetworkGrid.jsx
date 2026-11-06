import "./NetworkGrid.css"
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function NetworkGrid({data}){

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


    // Arreglar codigo relacionado a la clase
    let clase = ""
    let tipo = "RED PRIVADA"

    if (suma_hosts_n <= 254) {
        clase = "C";
    } else if (suma_hosts_n <= 65534) {
        clase = "B";
    } else if (suma_hosts_n <= 16777214) {
        clase = "A";
    } else {
        clase = "";
        tipo = "RED PUBLICA"
    }

    return (
        <div className="ng-container">
            <h1 className="n-name"><span>{tipo}</span> CLASE {clase}</h1>
            <ProgressBar value={PORCENTAJE_USO}></ProgressBar>
        </div>
    )
}