import { DELAY_IN_MS } from "../../src/constants/delays";

describe('String test', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  })
  it('Page "Строка" is available', function() {
    cy.contains('Строка');
  });

  it('Button is disabled while input is empty', function() {
    cy.get('input').as('input').should('not.have.value');
    cy.get('[type="submit"]').as('button').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
  });

  it('Algorithm works correctly', function() {
    cy.get('input').as('input').should('not.have.value');
    cy.get('[type="submit"]').as('button').should('be.disabled');
    cy.get('@input').type('abcd');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();

    cy.get('@input').should('be.disabled');

    cy.get('@button')
      .invoke("attr", "class").should('include', 'loader');

    cy.get('[class^="circle_circle"]').then((items: JQuery<HTMLElement>) => {
      const [el1, el2, el3, el4] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should("have.text", 'a');

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el2).should("have.text", 'b');

      cy.wrap(el3)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el3).should("have.text", 'c');

      cy.wrap(el4)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el4).should("have.text", 'd');

      cy.wait(DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should("have.text", 'd');
  
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2).should("have.text", 'b');
  
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el3).should("have.text", 'c');
  
        cy.wrap(el4)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el4).should("have.text", 'a');
      });

      cy.wait(DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should("have.text", 'd');
  
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el2).should("have.text", 'c');
  
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el3).should("have.text", 'b');
  
        cy.wrap(el4)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el4).should("have.text", 'a');
      });
    });

    cy.get('@input').should('have.text', '');
    cy.get('@button').should('be.disabled');
  });
})