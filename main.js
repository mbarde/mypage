const PROJECTS = JSON.parse(httpGet('projects.json').responseText);

const getProjectHtml = (project) => {
  const starStr = project.stargazers_count > 0 ?
    `<span class="stars" title="Stars on GitHub"><img src="star.svg"/>${project.stargazers_count}</span>`
    :
    '';
  const forkStr = project.forks_count > 0 ?
    `<span class="forks" title="Forks on GitHub"><img src="fork.svg"/>${project.forks_count}</span>`
    :
    '';
  const abstractStr = project.abstract ? `<div class="abstract">${project.abstract}</div>` : '';
  return `<div class="project fade-in">
    <div class="head">
      <b><a href="${project.html_url}">${project.name}</a></b>
    </div>
    <div class="description">${project.description}</div>
    <div class="meta">
      <span class="lang">${project.language}</span>
      ${forkStr}
      ${starStr}
    </div>
    ${abstractStr}
  </div>`;
}

const refreshProjects = (category) => {
  if (!PROJECTS.hasOwnProperty(category)) return;
  const projects = PROJECTS[category];
  const container = document.getElementById('projects');
  let html = '';
  container.innerHTML = projects.map((project) => getProjectHtml(project)).join('');
}

function httpGet(url) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  return xmlHttp;
}

const onHashChanged = (evt) => {
  const navLis = document.querySelectorAll('nav li');
  navLis.forEach((navLi) => navLi.classList.remove('active'));
  const hash = window.location.hash || '#me';
  const path = hash.slice(1);
  const html = httpGet(`${path}.html`).responseText;
  const contentArea = document.getElementById('content');
  contentArea.innerHTML = html;
  const navLi = document.getElementById(`nav-li-${path}`);
  navLi.classList.add('active');
  refreshProjects(path);
};

window.onhashchange = onHashChanged;

onHashChanged(false);
