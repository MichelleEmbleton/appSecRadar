import { renderDetailsPopup } from './detailsPopupView';
import { fadeIn } from '../transitions';
import { doms } from '../base';

export const detailsPopupControl = (id, data) => {
    data.forEach(el => id === el.TECH && renderDetailsPopup(el));
    fadeIn(doms.detailsBox);
};