const API_URL = 'https://us-central1-planet-4-151612.cloudfunctions.net/p4-test-swarm/';
const app = document.getElementById('app');

const request = new XMLHttpRequest();
request.open('GET', API_URL, true);

request.onload = function() {

  if (this.status == 200) {
    const data = JSON.parse(this.response);
    document.getElementById('loading').style.display = 'none';

    let html = `<div class="grid">`;

    Object.entries(data).forEach(item => {
      let status = 'off';
      const title = item[0];
      const git_url = 'https://github.com/greenpeace/planet4-test-' + title;
      const web_url = 'https://k8s.p4.greenpeace.org/test-' + title;
      const ci_url = 'https://circleci.com/gh/greenpeace/workflows/planet4-test-' + title;
      if (item[1] === 1) {
        status = 'on';
      }
      html += `<div class="item">
        <div class="title ${status}">${title}</div>
        <a href="${git_url}" target="_blank" class="link"><img src="static/git-square.svg" alt="source" title="source code"></a>
        <a href="${web_url}" target="_blank" class="link"><img src="static/external-link-square.svg" alt="web" title="website"></a>
        <a href="${ci_url}" target="_blank" class="link"><img src="static/circle-o.svg" alt="ci" title="ci"></a>`

      if (status == 'off') {
        const ticket_url = 'https://jira.greenpeace.org/browse/' + item[1];
        html += `<a href="${ticket_url}" target="_blank" class="link"><img src="static/tag.svg" alt="ticket" title="ticket"></a>`;
      }

      html += `</div>`;
    });

    html += `</div>`;

    app.outerHTML = html;

  } else {
    app.outerHTML = `error :(`;
  }
};

request.onerror = function() {
  app.outerHTML = `error :(`;
};

request.send();
