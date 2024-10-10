describe('SHFT Case Application', () => {
  const generateEmail = () => {
    const timestamp = Date.now();
    return `testuser${timestamp}@example.com`;
  };

  it('Should allow a user to sign up', () => {
    cy.visit('/');
    cy.contains('Sign Up').click();

    const email = generateEmail();
    
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must contain at least one special character').should('be.visible');

    cy.get('input[name="email"]').clear().type('testuser@example.com');
    cy.get('input[name="password"]').clear().type('password123*');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must contain at least one uppercase letter').should('be.visible');

    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type('Password123*');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');
  });

  it('Should allow a user to Sign In', () => {
    cy.visit('/');
    cy.contains('Sign In').click();
  
    const email = generateEmail();
    cy.get('input[name="email"]').clear().type('test@test.com');
    cy.get('input[name="password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');
  });

  it('should filter job listings', () => {
    cy.visit('/');
    cy.contains('Sign In').click();

    cy.get('input[name="email"]').clear().type('test@test.com');
    cy.get('input[name="password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');

    cy.visit('/list');
    cy.contains('Filter').click();
    cy.contains('Created At - Descending').click();
    cy.get('.job-listing').should('have.length.greaterThan', 0);

    cy.contains('Filter').click();
    cy.contains('Created At - Ascending').click();
    cy.get('.job-listing').should('have.length.greaterThan', 0);

    cy.contains('Filter').click();
    cy.contains('Salary - Descending').click();
    cy.get('.job-listing').should('have.length.greaterThan', 0);

    cy.contains('Filter').click();
    cy.contains('Salary - Ascending').click();
    cy.get('.job-listing').should('have.length.greaterThan', 0);
  });

  it('should allow a user to apply for a job', () => {
    cy.visit('/');
    cy.contains('Sign In').click();
    cy.get('input[name="email"]').clear().type('test@test.com');
    cy.get('input[name="password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');
    cy.visit('/list');
    cy.get('.job-listing').first().contains('Details').click();
    cy.contains('Apply').click();

  });

  it('should allow a user to withdraw an application', () => {
    cy.visit('/');
    cy.contains('Sign In').click();
    cy.get('input[name="email"]').clear().type('test@test.com');
    cy.get('input[name="password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');
    cy.visit('/list');
    cy.contains('Applied Jobs').should('be.visible');
    cy.get('.job-listing').first().contains('Withdraw').click();
    
  });
});
