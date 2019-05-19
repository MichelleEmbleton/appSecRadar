import { doms } from '../base';
import '../../css/anomaly_table.css';

const renderAnomalies = el => `
	<tr class="${el.trClass}">
		<td>${el.tech}</td>
		<td>${el.state}</td>
	</tr>`;

export const renderAnomalyTable = anomalyList => {
	let rows;
	const text = `
		<table id="anomalytable">
			<caption>Anomalies</caption>
			<tr>
				<th>Name</th>
				<th>Anomaly</th>
			</tr>`;

	rows = anomalyList.length < 1 ?
		`<tr class="no-entries">
			<td>No issues!</td>
		</tr>`	:				
		anomalyList.map(el => renderAnomalies(el)).join('');
		
	const contents = `${text} ${rows} </table>`;
	doms.anomalyTable.insertAdjacentHTML('beforeend', contents);			
};

