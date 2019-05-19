import { doms } from '../base';
import '../../css/legend.css';

export const renderLegend = el => {	
	const text = `
		<p id="legend-${el.ID}">${el.TITLE}</p>
		<p class="state-desc">${el.TEXT}</p>`;
	
	doms.legendContent.insertAdjacentHTML('beforeend', text);
};