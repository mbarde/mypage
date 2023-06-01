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
  httpGet('projects.json').then((json) => {
    const PROJECTS = JSON.parse(json);
    if (!PROJECTS.hasOwnProperty(category)) return;
    const projects = PROJECTS[category];
    const container = document.getElementById('projects');
    container.innerHTML = projects.map((project) => getProjectHtml(project)).join('');
  });
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
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = function () {
      const status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    }
    xhr.send();
  });
}

const updatePlayBtn = () => {
  const btn = document.getElementById('btn-play-knas');
  if (btn) btn.textContent = window.XMPlayer.playing ? '⏸️ Pause it' : '▶️ Play some music';
}

const onHashChanged = async () => {
  const navLis = document.querySelectorAll('nav li');
  navLis.forEach((navLi) => navLi.classList.remove('active'));
  const hash = window.location.hash || '#me';
  const path = hash.slice(1);

  const res = httpGet(`${path}.html`).then((html) => {
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
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      scriptElement.setAttribute('clr', isDarkMode ? 'white' : 'black');
      scriptElement.setAttribute('clr-font', isDarkMode ? 'white' : 'black');
      document.head.appendChild(scriptElement);

      updatePlayBtn();
    }
  });

  onToggleSidenav();
};

const switchHands = () => {
  const sidenav = document.querySelector('.sidenav');
  sidenav.classList.add('no-transition');
  setTimeout(() => {
    sidenav.classList.remove('no-transition');
  });
  const main = document.querySelector('.main');
  if (main.classList.contains('no-lefty-mode')) {
    main.classList.remove('no-lefty-mode');
  } else {
    main.classList.add('no-lefty-mode');
  }
  const dot = document.querySelector('.dot');
  dot.classList.remove('dot');
  setTimeout(() => dot.classList.add('dot'));
}

window.onhashchange = onHashChanged;

onHashChanged(false);

setTimeout(() => {
  document.getElementsByClassName('sidenav')[0].classList.remove('hidden');
}, 500);

const request = new XMLHttpRequest();
request.open('GET', 'knas.xm', true);
request.responseType = 'arraybuffer';
request.onload = () => {
  const XMPlayer = window.XMPlayer;
  XMPlayer.init();
  XMPlayer.load(request.response);
};
request.send();

console.log = function() {};

const toggleXMPlayer = () => {
  const btn = document.getElementById('btn-play-knas');

  if (window.XMPlayer.playing) {
    window.XMPlayer.pause();
  } else {
    window.XMPlayer.play();
  }
  updatePlayBtn();
}