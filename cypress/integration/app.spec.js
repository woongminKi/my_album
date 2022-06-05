describe("Navigation", () => {
  it("should navigate to the album page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/")
    cy.get("h1").contains("FreedSoft_Frontend Assignment")

    // Find a link with an href attribute containing "about" and click it
    cy.get("a[href*='album']").click().then(() => { })

    // The new url should include "/about"
    cy.url().should("include", "/album")

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Album")
  })
});
