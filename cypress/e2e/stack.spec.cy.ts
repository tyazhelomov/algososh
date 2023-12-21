import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Stack test', () => {
  beforeEach(() => {
    cy.visit('/stack');
  })
  it('Page "Стек" is available', function() {
    cy.contains('Стек');
  });

  it('Button is disabled while input is empty', function() {
    cy.get('input').as('input');
    cy.get('button').contains('Добавить').parent().as('button').should('be.disabled');
    cy.get('@input').type('10');
    cy.get('@button').should('not.be.disabled');
  });

  it('Added correctly', function() {
    cy.get('input').as('input');
    cy.get('button').contains('Добавить').parent().as('button').should('be.disabled');
    cy.get('@input').type('1');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@input').should('be.disabled');

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should('have.text', '1');

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      })
    })

    cy.get('@button').should('be.disabled');
    cy.get('@input').type('2');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@input').should('be.disabled');

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el1).should('have.text', '1');
      cy.wrap(el1.parentElement?.firstChild).should('not.have.text', 'head');

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', 'head');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el2).should('have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('have.text', 'head');
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@button').should('be.disabled');
  })

  it('Removed correctly', function() {
    cy.get('button').contains('Добавить').parent().as('addButton').should('be.disabled');
    cy.get('button').contains('Удалить').parent().as('removeButton').should('be.disabled');
    cy.get('input').as('input');
    cy.get('@input').type('1');
    cy.get('@addButton').click();
    cy.get('@input').type('2');
    cy.get('@addButton').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.get('@removeButton').click();
      })
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('not.have.text', 'head');

        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2).should('have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('have.text', 'head');

        cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 1);

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
          cy.wrap(el1).should('have.text', '1');
          cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        })
      })
      cy.get('@removeButton').click();
    })

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should('have.text', '1');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');


      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 0);
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@addButton').should('be.disabled');
    cy.get('@removeButton').should('be.disabled');
  })

  it('Cleared correctly', function() {
    cy.get('button').contains('Добавить').parent().as('addButton').should('be.disabled');
    cy.get('button').contains('Очистить').parent().as('clearButton').should('be.disabled');
    cy.get('input').as('input');
    cy.get('@input').type('1');
    cy.get('@addButton').click();
    cy.get('@input').type('2');
    cy.get('@addButton').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('@clearButton').click();

      cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 0);
    })

    cy.get('@input').should('have.text', '');
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
  })
})