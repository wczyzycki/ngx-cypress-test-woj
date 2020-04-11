// type definitions for Cypress object "cy"
/// <reference types="cypress" />

import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";
import {onDatePickerPage} from "../support/page_objects/datepickerPage";
import {onSmartTablePage} from "../support/page_objects/smartTablePage";


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

  it('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutPage();
    const email = 'woj@email.com';
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Woj', email);
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(email, 'asfdad')
    navigateTo.datepickerPage();
    onDatePickerPage.selectCommonDatePickerDateFromToday(1)
    onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName('woj', 'cz');
    onSmartTablePage.updateAgeByFirstName('woj', 30);
    onSmartTablePage.deleteRowByIndex(1);
  })

});
