import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/>
        </a>
    </li>`;
    })
    .join('');
}
const galeryMarkup = createGalleryItem(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galeryMarkup);

galleryList.addEventListener('click', onGaleryImageClick);

let instance;

function onGaleryImageClick(e) {
  const { target } = e;

  e.preventDefault();

  if (target.nodeName !== 'IMG') {
    return;
  }
  const imgSource = target.dataset.source;

  instance = basicLightbox.create(
    `
    <img src="${imgSource}">
  `,
    {
      onShow: instance => {
        instance
          .element()
          .querySelector('img')
          .addEventListener('click', onCloseModal);
        document.addEventListener('keydown', closeImgOnKeyPress);
      },

      onClose: instance => {
        instance
          .element()
          .querySelector('img')
          .removeEventListener('click', onCloseModal);
        document.removeEventListener('keydown', closeImgOnKeyPress);
      },
    }
  );

  instance.show();

  function onCloseModal() {
    instance.close();
  }
}

function closeImgOnKeyPress(e) {
  if (e.code !== 'Escape') {
    return;
  }
  instance.close();
}
