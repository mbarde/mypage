const updateProjects = async () => {
  const projects = {
    'web': ['sloth-tools', 'flask-qrcode', 'volto-image-crop-widget', 'volto-fullcalendar-block', 'collective-ploneboard-vue'],
    'fun': ['stupax', 'fightOfDwarves', 'AlienSurf', 'QuadWorld', 'terminal-pokedex', 'turtlemania-ts'],
    'more': ['twocams', 'raspi-cec-commander'],
  }

  let data = {};

  for (category in projects) {
    data[category] = [];
    for (let i = 0; i < projects[category].length; i++) {
      const project = projects[category][i];
      const url = `https://api.github.com/repos/mbarde/${project}`
      const res = await fetch(url);
      const json = await res.json();
      data[category].push(json);
      console.log(`got ${project}`)
    };
  }

  const fs = require('fs');
  fs.writeFile('projects.json', JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    }
    console.log('done!');
  });
};

updateProjects();
