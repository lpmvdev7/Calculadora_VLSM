import "./TablaVLSM.css"


export default function TablaVLSM({data, onSelectSubnet}){
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
						<tr 
							className="table-container-row" 
							key={subnet.id}
							// onClick={()=>console.log(subnet)}
							onClick={()=>onSelectSubnet(subnet)}
							>
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
				</tbody>
			</table>
		</div>
	)
}
