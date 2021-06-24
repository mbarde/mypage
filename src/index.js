import './styles/theme-dark.css';
import './styles/main.css';

let path = window.location.pathname;
let nav = document.getElementById('main-nav');
let lis = nav.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
  let a = lis[i].getElementsByTagName('a')[0];
  let href = a.href.toString();
  if (href.endsWith(path)) {
    lis[i].classList.add('active');
  }
}