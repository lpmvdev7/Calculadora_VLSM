import './InfoCard.css'
function InfoCard(props){
	return(
		<div className="ic-container">
			<span>{props.mainData}</span>
			<span>{props.dataInfo}</span>
		</div>
	)
}

export default InfoCard
