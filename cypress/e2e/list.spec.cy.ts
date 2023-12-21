import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('List test', () => {
  beforeEach(() => {
    cy.visit('/list');
  })
  it('Page "Связный список" is available', function() {
    cy.contains('Связный список');
  });

  it('Button is disabled while input is empty', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().as('buttonAddIndex').should('be.disabled');
    cy.get('@inputText').type('10');
    cy.get('@buttonAddHead').should('not.be.disabled');
    cy.get('@buttonAddTail').should('not.be.disabled');
    cy.get('@buttonAddIndex').should('be.disabled');
  });

  it('Fill default correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('modified'));
      cy.wrap(el1).should('have.text', '1');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el2).should('have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
        cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el2)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
          cy.wrap(el2).should('have.text', '2');
          cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
          cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');
        })
      })
    })

    cy.get('@inputText').should('have.text', '');
    cy.get('@buttonAddHead').should('be.disabled');
    cy.get('@buttonAddTail').should('be.disabled');
  })

  it('Add head correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('@inputText').type('3');
    cy.get('@buttonAddHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('modified'));
      cy.wrap(el1).should('have.text', '3');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '3');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@inputText').type('2');
    cy.get('@buttonAddHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '3');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', '2');
      cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should('have.text', '2');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
        })
      })
    })

    cy.get('@inputText').type('1');
    cy.get('@buttonAddHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', '1');
      cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');

    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
        })
      })
    })
  })

  it('Add tail correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddTail').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('modified'));
      cy.wrap(el1).should('have.text', '1');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contain('default'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contain('modified'));
        cy.wrap(el2).should('have.text', '2');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');
        cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el2)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
        })
      })
    })

    cy.get('@inputText').type('3');
    cy.get('@buttonAddTail').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [, el2, el3] = Array.from(items);

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '3');
      cy.wrap(el3.parentElement?.firstChild).should('have.text', '3');
      cy.wrap(el3.parentElement?.lastChild).should('not.have.text', 'tail');

      cy.get('[class^="circle_circle"]').then((items) => {
        const [, el2, el3] = Array.from(items);

        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el3).should('have.text', '3');
        cy.wrap(el2.parentElement?.firstChild).should('not.have.text', '3');
        cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
        cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
      })

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
      })
    })
  })

  it('Add by index correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('[name="index"]').as('inputIndex');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().as('buttonAddIndex').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddTail').click();
    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('@inputText').type('3');
      cy.get('@inputIndex').type('1');
      cy.get('@buttonAddIndex').click();
    })

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2, el3] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el1).should('have.text', '3');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', '3');
      cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
      cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('circle_small').contain('changing'));
        cy.wrap(el2).should('have.text', '3');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el3.parentElement?.firstChild).should('have.text', '3');
        cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3] = Array.from(items);
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el2).should('have.text', '3');
        cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
        cy.wrap(el3.parentElement?.firstChild).should('not.have.text', '3');
        cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [, el2] = Array.from(items);
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
      })
    })
  })

  it('Remove head correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Удалить из head').parent().as('buttonDeleteHead').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddTail').click();
    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();

    cy.get('@buttonDeleteHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '1');
      cy.wrap(el1).should('not.have.text', '1');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 1);
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@buttonDeleteHead').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el1).should('not.have.text', '2');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', '2');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 0);
    })
  })

  it('Remove tail correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Удалить из tail').parent().as('buttonDeleteTail').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddTail').click();
    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();


    cy.get('@buttonDeleteTail').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [, el2, el3] = Array.from(items);

      cy.wrap(el3)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el3).should('have.text', '2');
      cy.wrap(el2).should('not.have.text', '2');
      cy.wrap(el2.parentElement?.lastChild).should('have.text', '2');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 1);
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@buttonDeleteTail').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '1');
      cy.wrap(el1).should('not.have.text', '1');
      cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').should('satisfy', (items) => items.length === 0);
    })
  })

  it('Remove by index correctly', function() {
    cy.get('[name="text"]').as('inputText');
    cy.get('[name="index"]').as('inputIndex');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Удалить по индексу').parent().as('buttonDeleteIndex').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddTail').click();
    cy.get('@inputText').type('2');
    cy.get('@buttonAddTail').click();
    cy.get('@inputIndex').type('1');

    cy.get('@buttonDeleteIndex').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contain('changing'));
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2, el3] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('circle_small').contain('changing'));
        cy.wrap(el3).should('have.text', '2');
        cy.wrap(el2).should('not.have.text', '2');
        cy.wrap(el2.parentElement?.lastChild).should('have.text', '2');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
      })
    })

    cy.get('@inputIndex').type('0');
    cy.get('@buttonDeleteIndex').click();

    cy.get('[class^="circle_circle"]').then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contain('changing'));
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('circle_small').contain('changing'));
        cy.wrap(el2).should('have.text', '1');
        cy.wrap(el1).should('not.have.text', '1');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
      })
    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('[class^="circle_circle"]').should('not.exist');
    })
  })
})
