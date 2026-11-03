import "./TablaVLSMSubnet.css"

export default function TablaVLSMSubnet(){
    return(
        <table className="tvlsms-table">
            <thead>
                <tr className="tvlsms-tablerow">
                    <th>N Subred</th>
                    <th>Total Hosts</th>
                    <th>N hosts</th>
                    <th>Red</th>
                    <th>Broadcast</th>
                    <th>Primera ip</th>
                    <th>Ultima ip</th>
                    <th>Prefijo de red</th>
                    <th>Mascara</th>
                </tr>
            </thead>
            <tbody>
                <tr className="tvlsms-tablerow">
                    <td>1</td>
                    <td>126</td>
                    <td>89</td>
                    <td>192.168.0.0</td>
                    <td>192.168.0.127</td>
                    <td>192.168.0.1</td>
                    <td>192.168.0.126</td>
                    <td>/25</td>
                    <td>255.255.255.255</td>
                </tr>
            </tbody>
        </table>
    )
}