describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // create here a user to backend
    const user = {
      name: 'ssihvola',
      username: 'sihvola',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sihvola')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sihvola', password: 'salainen' })
      cy.createBlog({
        title: 'valivalivali',
        author: 'jari',
        url: 'www.tykitellaan.fi'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#blog-title').type('lisää valitusta')
      cy.get('#blog-author').type('jari')
      cy.get('#blog-url').type('www.tykitellaan.fi')
      cy.get('#create-blog').click()

      cy.get('.addedBlog')
        .should('contain', 'a new blog lisää valitusta by jari added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('blog can be removed', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.should('not.have.value', 'valivalivali')
    })

    it('another user does not see the remove button', function() {
      cy.contains('log out').click()
      const user = {
        name: 'pertti',
        username: 'röökimuija',
        password: 'salainen'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

      cy.get('#username').type('röökimuija')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.should('not.have.value', 'remove')
    })

    it('most liked blog is shown first', function() {
      cy.createBlog({
        title: 'lisää valitusta',
        author: 'jari',
        url: 'www.tykitellaan.fi'
      })

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('lisää valitusta')
        .contains('view')
        .click()

      cy.contains('lisää valitusta')
        .parent()
        .find('button:contains("like")')
        .click()
        .wait(500)
        .contains('like')
        .click()

      cy.get('.blog')
        .eq(0)
        .should('contain', 'lisää valitusta')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'valivalivali')
    })
  })
})