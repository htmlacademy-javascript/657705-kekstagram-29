import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const PHOTOS_COUNT = 25;

renderThumbnails(getPhotos(PHOTOS_COUNT));
