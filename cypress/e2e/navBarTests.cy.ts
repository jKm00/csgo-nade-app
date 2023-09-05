describe('Test nav bar', () => {
	it('Does not find profile picture when unauthorized', () => {
		cy.get('[data-cy="profile-picture"]').should('not.exist');
	});
});
