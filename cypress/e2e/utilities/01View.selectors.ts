import { ButtonClass } from './bulma.classes';
import { cySelector } from './utils';

const baseView = 'home-page';

export const homePageViewSelector = cySelector(`${baseView}-view`);

export const homePageTitleSelector = cySelector(`${baseView}-title`);
export const homePageCounterSelector = cySelector(`${baseView}-counter`);

export const homePageButtonSelector = cySelector(`${ButtonClass}-${baseView}`);
