import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Отримання збереженого часу відтворення після перезавантаження сторінки
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

// Використання throttle
const saveTimeToLocalStorage = throttle(function (time) {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000);

// Відстеження події timeupdate
player.on('timeupdate', function (event) {
  const currentTime = event.seconds;
  saveTimeToLocalStorage(currentTime);
});

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
