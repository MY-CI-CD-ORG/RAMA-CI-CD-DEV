beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
        if(err.message.includes('is not a function') || err.message.includes('is not defined') || err.message.includes('reading \'addEventListener\''))
        {
            return false
        }
    })
})

describe('Reports Focus Area', () => {
    it('visits the form', () => {
        cy.visit('http://127.0.0.1:8000/')
    })

    it('visits the login form', () => {
        cy.get('#login').click()
    })

    it('requires email', () => {
        cy.get('#email_input').type('campususer123@gmail.com{enter}')
    })

    it('requires password name', () => {
        cy.get('#password_input').type('CEPITesting123')
    })

    it('can submit a valid form', () => {
        cy.get('#loginForm').submit()
    })

    it('Analytic Focus Area Reports', () => {
        cy.get('#analyticnav').click()
        cy.contains('Reports').next('.dropdown-menu').then($el => {
            cy.wrap($el).invoke('show')
            cy.wrap($el).contains('Focus Area').click()
        })
    })

    it('Academic Year', () => {
        cy.get('#select2-id_academic_year-container').click()
        cy.get('#select2-id_academic_year-results').then(($li) => {
            cy.wrap($li).contains("2016-17").click();
        })
    })

    it('Engagement Types', () => {
        cy.get('#select2-id_engagement_type-container').click()
        cy.get('#select2-id_engagement_type-results').then(($li) => {
            cy.wrap($li).contains("Access to Higher Education").click();
        })
    })

    it('Community Organization Types', () => {
        cy.get('#select2-id_community_type-container').click()
        cy.get('#select2-id_community_type-results').then(($li) => {
            cy.wrap($li).contains("Business").click();
        })
    })

    it('College and Main Units', () => {
        cy.get('#select2-id_college_name-container').click()
        cy.get('#select2-id_college_name-results').then(($li) => {
            cy.wrap($li).contains("Academic Affairs").click();
        })
    })

    it('Campus Partners', () => {
        cy.get('#select2-id_campus_partner-container').click()
        cy.get('#select2-id_campus_partner-results').then(($li) => {
            cy.wrap($li).contains("All").click();
        })
    })

    it('CEC Building Partners', () => {
        cy.get('#select2-id_weitz_cec_part-container').click()
        cy.get('#select2-id_weitz_cec_part-results').then(($li) => {
            cy.wrap($li).contains("Current Community Building Partners").click();
        })
    })

    // Hide Filters and Reset Filters

     it('Hide Filters', () => {
        cy.get('#hidefilterbtn').click()
        cy.get('#resetfilterbtn').click()
     })
})