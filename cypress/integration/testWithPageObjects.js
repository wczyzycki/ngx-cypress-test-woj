// type definitions for Cypress object "cy"
/// <reference types="cypress" />

import {navigateTo} from "../support/page_objects/navigationPage";

describe('Test with pageObjects', () => {

  beforeEach('open application', () => {
    cy.visit('/');
  })

  it('Verify navigation across the pages', () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.toastrPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
  });


});
