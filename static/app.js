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
      let title = item[0];
      let url = 'https://github.com/greenpeace/planet4-test-' + title + '/blob/develop/composer-local.json';
      if (item[1]) {
        status = 'on';
      }
      html += `<div class="item">
        <a href="${url}" target="_blank">
          <img src="static/server.svg" alt="server" class="icon">
        </a>
        <div class="title ${status}">${title}</div>
      </div>`;
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
