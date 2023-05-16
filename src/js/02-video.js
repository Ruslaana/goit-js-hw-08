import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// Отримання збереженого часу відтворення після перезавантаження сторінки
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

// Використання throttle
const saveTimeToLocalStorage = throttle(function (time) {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000); // Затримка в 1000 мс (1 секунда)

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
