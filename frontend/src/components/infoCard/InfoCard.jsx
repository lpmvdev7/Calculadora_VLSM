import './InfoCard.css'
function InfoCard(props){
	return(
		<div class="ic-container">
			<span>{props.mainData}</span>
			<span>{props.dataInfo}</span>
		</div>
	)
}

export default InfoCard
