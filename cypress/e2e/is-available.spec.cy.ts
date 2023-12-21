describe('Availability test', () => {
  it('Service is available', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
    cy.contains('Сделано в Практикуме.')
  })
})