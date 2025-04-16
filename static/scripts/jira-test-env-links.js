// ==UserScript==
// @name         Test env links
// @description  Adds links to the frontend, admin, github and circleci pages of the test environment.
// @version      0.1
// @match        https://greenpeace-planet4.atlassian.net/browse/PLANET-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    const envRow = document.getElementById('rowForcustomfield_13000')
    const testEnvSpan = document.querySelector( '#customfield_13000-field span' )
    const buttonStyle = 'border: 1px solid #67CC00 !important;border-radius: 3px; padding: 5px;" target="_blank'

    if (!testEnvSpan) {
        const dashLink = document.createElement('a')
        dashLink.attributes.style = buttonStyle
        envRow.appendChild(dashLink)

        return
    }
    const testEnv = testEnvSpan.innerHTML
    if (!testEnv) {
        return
    }
    const linkRow = document.createElement('div')

    linkRow.style.marginTop = '12px';
    linkRow.innerHTML = `
<a style="${buttonStyle}" target="_blank" href="https://www-dev.greenpeace.org/test-${testEnv}">frontend</a>
<a style="${buttonStyle}" target="_blank" href="https://www-dev.greenpeace.org/test-${testEnv}/wp-admin/">admin</a>
<a style="${buttonStyle}" target="_blank" href="https://github.com/greenpeace/planet4-test-${testEnv}/blob/develop/composer-local.json">composer-local.json</a>
<a style="${buttonStyle}" target="_blank" href="https://app.circleci.com/pipelines/github/greenpeace/planet4-test-${testEnv}">circle ci</a>
`
    envRow.appendChild(linkRow)
})()

