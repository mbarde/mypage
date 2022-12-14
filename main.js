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
    <a href="${project.html_url}">
      <div class="head">
        <b>${project.name}</b>
      </div>
      <div class="description">${project.description}</div>
      <div class="meta">
        <span class="lang">${project.language}</span>
        ${forkStr}
        ${starStr}
      </div>
    </a>
    ${abstractStr}
  </div>`;
}

const refreshProjects = (category) => {
  if (!PROJECTS.hasOwnProperty(category)) return;
  const projects = PROJECTS[category];
  const container = document.getElementById('projects');
  container.innerHTML = projects.map((project) => getProjectHtml(project)).join('');
}

const onToggleSidenav = () => {
  const sidenav = document.getElementsByClassName('sidenav')[0];
  if (sidenav.classList.contains('open')) onHideSidenav();
  else onOpenSidenav();
}

const onOpenSidenav = () => {
  const sidenav = document.getElementsByClassName('sidenav')[0];
  sidenav.classList.add('open');
  const toggle = document.getElementsByClassName('sidenav-toggle')[0];
  toggle.classList.add('open');
}

const onHideSidenav = () => {
  const sidenav = document.getElementsByClassName('sidenav')[0];
  sidenav.classList.remove('open');
  const toggle = document.getElementsByClassName('sidenav-toggle')[0];
  toggle.classList.remove('open');
}

function httpGet(url) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  return xmlHttp;
}

const onHashChanged = () => {
  const navLis = document.querySelectorAll('nav li');
  navLis.forEach((navLi) => navLi.classList.remove('active'));
  const hash = window.location.hash || '#me';
  const path = hash.slice(1);
  const res = httpGet(`${path}.html`);
  if (res.status !== 200) return;
  const html = res.responseText;
  const contentArea = document.getElementById('content');
  contentArea.innerHTML = html;
  const navLi = document.getElementById(`nav-li-${path}`);
  navLi.classList.add('active');
  refreshProjects(path);

  const el = document.getElementById('turtlemania-js');
  if (el !== null) {
    el.parentNode.removeChild(el);
  }

  if (path === 'turtle') {
    let scriptElement = document.createElement('script');
    scriptElement.id = 'turtlemania-js';
    scriptElement.type = 'text/javascript';
    scriptElement.src = './turtle.js';
    scriptElement.setAttribute('clr', 'black');
    document.head.appendChild(scriptElement);
  }

  onToggleSidenav();
};

window.onhashchange = onHashChanged;

onHashChanged(false);
