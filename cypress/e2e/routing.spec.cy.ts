describe('Availability test', () => {
  beforeEach(function() {
    cy.visit('/');
  });
  it('Page "Строка" is available', function() {
    cy.visit('/recursion');
    cy.contains('Строка');
  });
  it('Page "Фибоначчи" is available', function() {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });
  it('Page "Сортировка массива" is available', function() {
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
  });
  it('Page "Стек" is available', function() {
    cy.visit('/stack');
    cy.contains('Стек');
  });
  it('Page "Очередь" is available', function() {
    cy.visit('/queue');
    cy.contains('Очередь');
  });
  it('Page "Связный список" is available', function() {
    cy.visit('/list');
    cy.contains('Связный список');
  });
})