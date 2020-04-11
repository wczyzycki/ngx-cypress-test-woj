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
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email')
      .should('have.class', 'label')
      .and('have.text', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
      expect(label).to.have.class('label')
      expect(label).to.have.text('Email address')
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

  it('assert property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2020');
        cy.wrap(input).should('have.value', 'Apr 17, 2020');
      });

  });

  it('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[type=radio]')
      .then(radioButton => {
        cy.wrap(radioButton)
          .first()
          .check({force: true})
          .should('be.checked')

        cy.wrap(radioButton)
          .eq(1)  //index
          .check({force: true})

        cy.wrap(radioButton)
          .first()
          .should('not.be.checked')

        cy.wrap(radioButton)
          .eq(2)
          .should('be.disabled')
      })
  })

  it('check box', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    cy.get('[type=checkbox]').check({force: true});
    cy.get('[type=checkbox]').eq(0).click({force: true});
    cy.get('[type=checkbox]').eq(1).check({force: true})

  })

  it('lists and dropdowns', () => {
    cy.visit('/');

    // 1
    // cy.get('nav nb-select').click();
    // cy.get('ul.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');


    //2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('ul.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      })
    });

  });

  it('View tables', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click();
      cy.wrap(tableRow).find('[placeholder=Age]').clear().type('25');
      cy.wrap(tableRow).find('.nb-checkmark').click();
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25');

    })
  });

  it('Add row', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    cy.get('thead').find('.nb-plus').click();
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Woj');
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Cz');
      cy.wrap(tableRow).find('.nb-checkmark').click();
    });

    cy.get('tbody tr').first().find('td').then(tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Woj');
      cy.wrap(tableColumns).eq(3).should('contain', 'Cz');
    })

  });

  it('Check rows', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    // cy.get('thead [placeholder=Age]').type('20')
    // cy.wait(500)
    // cy.get('tbody tr').each(tableRow => {
    //   cy.wrap(tableRow).find('td').eq(6).should('contain', '20')
    // })


    const age = [20, 30, 40, 200];

    cy.wrap(age).each(age => {
      cy.get('thead [placeholder=Age]').clear().type(age);
      cy.wait(500);

      cy.get('tbody tr').each(tableRow => {
        if (age === 200) {
          cy.wrap(tableRow).should('contain', 'No data found')
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        }
      })

    })
  });

  it('Datepicker dynamic date', () => {

    const selectDayFromCurrent = day => {
      let date = new Date();
      date.setDate((date.getDate() + day));

      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('en-GB', {month: 'short'})
      cy.log(futureMonth);

      let dayAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear();

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        }
      );
      return dayAssert;
    }

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click();
      let dayAssert = selectDayFromCurrent(25);
      cy.wrap(input).invoke('prop', 'value').should('contain', dayAssert);
      cy.wrap(input).should('have.value', dayAssert);
    });

  });

  describe('Tooltips and modal', () => {
    it('Tooltip', () => {
      cy.visit('/');
      cy.contains('Modal & Overlays').click();
      cy.contains('Tooltip').click();

      cy.contains('nb-card', 'Colored Tooltips')
        .contains('Default').click();
      cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    });

    it('Dialog box - Alert', () => {
      cy.visit('/');
      cy.contains('Tables & Data').click();
      cy.contains('Smart Table').click();

      //1 -- poor way - doesn't work if alert is not appear
      // cy.get('tbody tr').first().find('.nb-trash').click();
      // cy.on('window:confirmed', (confirm) => {
      //   expect(confirm).to.equal("Are you sure you want to delete?")
      // })

      //2 - right way
      const stub = cy.stub()
      cy.on('window:confirmed', stub);
      cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      });

      //3 - cancel alert
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirmed', () => false);

    });
  });
});

