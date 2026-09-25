const dialog = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const closeButton = document.querySelector('#close-lightbox');

const uploads = [
  '0ccb73c7dfdaec05b564dad058bd3fc11f21d4b59466a5d32a421e447166c1c0.0.PNG',
  '1755270457023.png',
  '1762340016494.jpg',
  '1762340024601.jpg',
  '1770148745114.jpg',
  '1770422712691.jpg',
  '1770422713713.jpg',
  '1770735528456.png',
  '1783967763535.jpg',
  '1785949698428.jpg',
  '无标题1_20250622182250.png',
  '无标题185_20260610212310.png',
  '无标题192_20260704032819.png',
  '无标题198_20260712144147.png',
  '无标题198_20260815183236.png',
  '无标题242_20260905090738.png',
  '无标题249_20260916202942.png',
  '无标题250_20260919230434.png',
  '无标题27_20260810133643.png',
  '无标题37_20250915141401.png',
  '无标题69_20250925134027.png',
  'bfcfac80-a065-4806-a527-14f0d9a3ecb7.jpeg',
  'file_000000009e2862078401a4feec86917e.png',
  'Gemini_Generated_Image_g3ozcgg3ozcgg3oz.png',
  'Image_1763033046269.jpg',
  'Image_1778946905164_502.jpg',
  'Image_1785507815579_0.jpg',
  'Image_1786340515036_377.jpg',
  'Image_1787461227618_164.png',
  'Image_1787925937910_585.png',
  'Image_1787926376586_227.png',
  'Image_1788053319173_237.png',
  'Image_1788148420003_188.png',
  'IMG_20251220_044758.png',
  'IMG_20260326_181846.png',
  'IMG_20260327_212520.jpg',
  'IMG_20260609_124740.jpg',
  'IMG_20260704_031712.jpg',
  'IMG_20260821_180419.png',
  'IMG_20260915_171637.jpg',
  'IMGfcd7df5fe1d64a9c91e38854a5caf278.jpg',
  'lVzHR7MD7K7u.jpg',
  'mmexport1768071356213.jpg',
  'mmexport1775338107944.jpg',
  'mmexport1778466216052.png',
  'mmexport1783967629205.jpg',
  'mmexport1784649276438.jpg',
  'mmexport1784649278162.jpg',
  'mmexport1784649279592.jpg',
  'mmexport1785402265891.jpg',
  'mmexport1785402267236.jpg',
  'mmexport1785402268283.jpg',
  'mmexport1785402269363.jpg',
  'mmexport1790078594714.jpg',
  'mmexport1790173551402.jpg',
];

document.querySelector('#gallery').insertAdjacentHTML('beforeend', uploads.map((name, index) => {
  const src = `./assets/images/pic/${encodeURIComponent(name)}`;
  return `<figure class="gallery-card"><button class="image-button" type="button" data-full="${src}" aria-label="放大查看新增图片 ${index + 1}"><img src="${src}" alt="${name}" loading="lazy"></button><figcaption>文字说明待补充</figcaption></figure>`;
}).join(''));

const search = document.querySelector('#gallery-search');
const cards = [...document.querySelectorAll('.gallery-card')];
search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  let matches = 0;
  cards.forEach((card) => {
    const img = card.querySelector('img');
    const text = `${card.querySelector('figcaption').textContent} ${img.alt} ${img.getAttribute('src')}`.toLocaleLowerCase();
    card.hidden = !text.includes(query);
    if (!card.hidden) matches++;
  });
  document.querySelector('#search-empty').hidden = matches > 0;
});

document.querySelectorAll('.image-button').forEach((button) => {
  button.addEventListener('click', () => {
    image.src = button.dataset.full;
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dialog.open) dialog.close();
});
