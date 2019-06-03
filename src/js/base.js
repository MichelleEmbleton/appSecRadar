export const doms = {
    errorMessage: document.querySelector('.load-error'),
    btns: document.querySelectorAll('.display-btn'),
    svg: document.getElementById('svgRadar'),
    svgDiv: document.getElementById('radar'),
    legendContent: document.getElementById('legend_content'),
    anomalyTable: document.getElementById('anomaly_table'),
    modeChart: document.getElementById('mode_chart'),
    detailsBox: document.getElementById("details_box"),
    sectorList: document.getElementById("sector_list"),
    statusList: document.getElementById("status_list"),
    subcatList: document.getElementById("subcat_list")
};

export const svgs = {
    ns: "http://www.w3.org/2000/svg",
    xs: "http://www.w3.org/1999/xlink"
};

export const sectorDoms = () => {
	const sectorBorder = document.querySelectorAll(".sector-border");
	const arc = document.querySelectorAll(".sector-arc");
    	const textPath = document.querySelectorAll(".text-path");
	const borders = Array.from(sectorBorder);   
    	const arcs = Array.from(arc);
    	const text = Array.from(textPath);
	return [borders, arcs, text];
};
