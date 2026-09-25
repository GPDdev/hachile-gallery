import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const makeCard = (caption, alt, src) => ({
  hidden: false,
  querySelector(selector) { return selector === 'figcaption' ? { textContent: caption } : { alt, getAttribute() { return src; } }; },
});
const cards = Array.from({ length: 9 }, (_, index) => makeCard(index === 0 ? 'shortskirtsandexplosions' : '原有说明', `Gallery image ${index + 1}`, `gallery-0${index + 1}.jpg`));
const search = { value: '', addEventListener(type, handler) { if (type === 'input') this.onInput = handler; } };
const empty = { hidden: true };
const gallery = { insertAdjacentHTML(position, html) {
  assert.equal(position, 'beforeend');
  const figures = [...html.matchAll(/<figure class="gallery-card">([\s\S]*?)<\/figure>/g)];
  assert.equal(figures.length, 55);
  for (const [, figure] of figures) {
    assert.match(figure, /<figcaption>文字说明待补充<\/figcaption>/);
    cards.push(makeCard('文字说明待补充', figure.match(/alt="([^"]+)"/)[1], figure.match(/src="([^"]+)"/)[1]));
  }
} };
const inert = { addEventListener() {} };
const document = {
  querySelector(selector) {
    return { '#gallery': gallery, '#gallery-search': search, '#search-empty': empty,
      '#lightbox': inert, '#lightbox-image': {}, '#close-lightbox': inert }[selector];
  },
  querySelectorAll(selector) { return selector === '.gallery-card' ? cards : Array.from({ length: 64 }, () => inert); },
  addEventListener() {},
};

runInNewContext(readFileSync(new URL('../assets/app.js', import.meta.url), 'utf8'), { document });
assert.equal(cards.length, 64);
for (const [query, expected] of [['shortskirts', 1], ['gallery-01', 1], ['IMG_20260326', 1], ['文字说明待补充', 55], ['no-such-picture', 0], ['', 64]]) {
  search.value = query;
  search.onInput();
  assert.equal(cards.filter((card) => !card.hidden).length, expected);
  assert.equal(empty.hidden, expected > 0);
}
