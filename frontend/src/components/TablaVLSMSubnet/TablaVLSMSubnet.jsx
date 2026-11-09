import "./TablaVLSMSubnet.css"

export default function TablaVLSMSubnet({data}){
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
					<tr 
						className="tvlsms-tablerow" 
						key={data.id}
						>
						<td>{data.id}</td>
						<td>{data.hosts_posibles}</td>
						<td>{data.numero_hosts}</td>
						<td>{data.rango.First}</td>
						<td>{data.rango.Last}</td>
						<td>{data.rango.First_usable}</td>
						<td>{data.rango.Last_usable}</td>
						<td>/{data.prefijo_red}</td>
						<td>{data.mascara}</td>
					</tr>
            </tbody>
        </table>
    )
}