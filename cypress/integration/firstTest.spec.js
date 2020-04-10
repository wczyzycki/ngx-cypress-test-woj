// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Our first suite', () => {
  it('first test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //by Tag
    cy.get('input');

    //by ID
    cy.get('#inputEmail1');

    //by Class name
    cy.get('.input-full-width');

    //by Attribute name
    cy.get('[placeholder ]');

    //by Attribute name and value
    cy.get('[placeholder=Email]');

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute value
    cy.get('input[placeholder=Email]');

    //by Tag name and Attribute value
    cy.get('[placeholder=Email][fullwidth]');

    //by Tag name and Attribute value, ID class name
    cy.get('input[placeholder=Email]#inputEmail1.input-full-width');
  });

  it('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy=signInButton]');

    cy.contains('[status=warning]', 'Sign in');

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
  });

  it('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email');
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      //jQuery format
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();

      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then(secondForm => {

        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text();
        expect(passwordLabelFirst).to.equal((passwordSecondText));

        //back to the cy format
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password');

      });

    });

  });

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email');

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
    });

    //3 -> invoke
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address');
    });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked');
      .then(classValue => {
        expect(classValue).to.contain('checked');
      });

  });

  it.only('assert property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2020');
      });

  });

});

