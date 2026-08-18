const dialog = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const closeButton = document.querySelector('#close-lightbox');

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
