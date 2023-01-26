import {
  homePageViewSelector,
  homePageTitleSelector,
  homePageButtonSelector,
  homePageCounterSelector,
} from './utilities/01View.selectors';

import { ButtonSelector, isExtraSelector } from './utilities/bulma.selectors';
import { isExtraClass } from './utilities/bulma.classes';

import { logoAppSelector } from './utilities/common.selectors';

describe('01 View', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('01 Login view', () => {
    cy.log('01-01 - View, show correctly ');

    cy.get(homePageCounterSelector).should('be.visible');
    cy.get(homePageButtonSelector).should('be.visible');
    cy.get(homePageTitleSelector).should('be.visible');
    cy.get(homePageViewSelector).should('be.visible');
    cy.get(ButtonSelector).should('be.visible');
    cy.get(isExtraSelector).should('be.visible');
    cy.get(logoAppSelector).should('be.visible');

    cy.get(ButtonSelector).should('have.class', isExtraClass);

    cy.log('01-02 - Counter, works correctly ');

    cy.get(homePageCounterSelector).should('have.text', '0');

    cy.get(homePageButtonSelector).click();

    cy.get(homePageCounterSelector).should('not.have.text', '0');
    cy.get(homePageCounterSelector).should('have.text', '1');
  });
});
