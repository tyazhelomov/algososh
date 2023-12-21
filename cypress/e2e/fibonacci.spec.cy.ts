import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Fibonacci test', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
    cy.get('input').clear();
  })
  it('Page "Последовательность Фибоначчи" is available', function() {
    cy.contains('Последовательность Фибоначчи');
  });

  it('Button is disabled while input is empty', function() {
    cy.get('input').as('input');
    cy.get('[type="submit"]').as('button').should('be.disabled');
    cy.get('@input').type('10');
    cy.get('@button').should('not.be.disabled');
  });

  it('Algorithm works correctly', function() {
    cy.get('input').as('input');
    cy.get('[type="submit"]').as('button');
    cy.get('@input').type('5');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();

    cy.get('@input').should('be.disabled');

    cy.get('@button')
      .invoke("attr", "class").should('include', 'loader');

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1).should('have.text', '1');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el2).should('have.text', '1');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3] = Array.from(items);

        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el2).should('have.text', '1');
        cy.wrap(el3).should('have.text', '2');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3, el4] = Array.from(items);

        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el2).should('have.text', '1');
        cy.wrap(el3).should('have.text', '2');
        cy.wrap(el4).should('have.text', '3');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3, el4, el5] = Array.from(items);

        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el2).should('have.text', '1');
        cy.wrap(el3).should('have.text', '2');
        cy.wrap(el4).should('have.text', '3');
        cy.wrap(el5).should('have.text', '5');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3, el4, el5, el6] = Array.from(items);

        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el2).should('have.text', '1');
        cy.wrap(el3).should('have.text', '2');
        cy.wrap(el4).should('have.text', '3');
        cy.wrap(el5).should('have.text', '5');
        cy.wrap(el6).should('have.text', '8');
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@button').should('be.disabled');
  });
})