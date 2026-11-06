import "./TablaVLSM.css"


export default function TablaVLSM({data}){
	return(
		<div className="table-container">
			<table>
				<thead>
					<tr className="table-container-row">
						<th>N subred</th>
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
					{data.map((subnet)=>(
						<tr className="table-container-row" key={subnet.id}>
							<td>{subnet.id}</td>
							<td>{subnet.hosts_posibles}</td>
							<td>{subnet.numero_hosts}</td>
							<td>{subnet.rango.First}</td>
							<td>{subnet.rango.Last}</td>
							<td>{subnet.rango.First_usable}</td>
							<td>{subnet.rango.Last_usable}</td>
							<td>/{subnet.prefijo_red}</td>
							<td>{subnet.mascara}</td>
						</tr>
					))}
					{/* <tr className="table-container-row">
						<td>{id}</td>
						<td>{total_hosts}</td>
						<td>{n_hosts}</td>
						<td>{red_ip}</td>
						<td>{broadcast_ip}</td>
						<td>{first}</td>
						<td>{last}</td>
						<td>/{prefix}</td>
						<td>{mask}</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	)
}
