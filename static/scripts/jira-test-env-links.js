// ==UserScript==
// @name         Test env links
// @description  Adds links to the frontend, admin, github and circleci pages of the test environment. Adds an iframe with swarm dash if ticket has no test env yet.
// @version      0.1
// @match        https://jira.greenpeace.org/browse/PLANET-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    const style = document.createElement('style')
    style.innerHTML = `
#customfield-panel-1 {
    position:relative;
}
`
    document.head.appendChild(style)


    function addSwarmFrame () {
        const dashButton = document.createElement('button')
        const previewIframe = document.createElement('iframe')
        const customFieldsPanel = document.getElementById('customfield-panel-1')
        previewIframe.style.cssText = 'display: none; position: absolute;right: 4px; z-index: 2; border: 2px solid black; border-radius: 4px;'
        previewIframe.width = 700
        previewIframe.height = 500

        dashButton.innerHTML = 'swarm dashboard'
        dashButton.style.cssText = `${buttonStyle} position: absolute; right: 0; bottom: 0`

        customFieldsPanel.appendChild(dashButton)
        customFieldsPanel.appendChild(previewIframe)

        dashButton.addEventListener('click', (event) => {
            previewIframe.src = 'https://greenpeace.github.io/planet4-test-swarm/'
            previewIframe.style.display = previewIframe.style.display === 'none' ? 'block' : 'none'
            event.stopPropagation()

            return false
        })
        document.addEventListener('click', (event) => {
            previewIframe.style.display = 'none'
        })
    }

    const envRow = document.getElementById('rowForcustomfield_13000')
    const testEnvSpan = document.querySelector( '#customfield_13000-field span' )
    const buttonStyle = 'border: 1px solid #67CC00 !important;border-radius: 3px; padding: 5px;'

    if (!testEnvSpan) {
        addSwarmFrame()

        return
    }
    const testEnv = testEnvSpan.innerHTML
    if (!testEnv) {
        addSwarmFrame()

        return
    }
    const linkRow = document.createElement('div')
    linkRow.style.cssText = `position: absolute; right: 0; bottom: 3px;`
    linkRow.innerHTML = `
<span style="font-size: 14px" >${testEnv}</span>
<a style="${buttonStyle}" target="_blank" href="https://k8s.p4.greenpeace.org/test-${testEnv}">frontend</a>
<a style="${buttonStyle}" target="_blank" href="https://k8s.p4.greenpeace.org/test-${testEnv}/wp-admin/">admin</a>
<a style="${buttonStyle}" target="_blank" href="https://github.com/greenpeace/planet4-test-${testEnv}/blob/develop/composer-local.json">composer-local.json</a>
<a style="${buttonStyle}" target="_blank" href="https://circleci.com/gh/greenpeace/workflows/planet4-test-${testEnv}/tree/develop">circle ci</a>
`
    envRow.appendChild(linkRow)
})()

