import { browser } from "$app/environment";

let left = 600;
let top = 200;
export function dragMe(node) {
  let moving = false;

  if (browser) {
    // Window scrolling Y changing saves state when close and open.
    top = top + window.scrollY;
    node.style.position = 'absolute';
    node.style.top = `${top}px`;
    node.style.left = `${left}px`;
    node.style.cursor = 'move';
    node.style.userSelect = 'none';

    node.addEventListener('mousedown', () => {
      moving = true;
    });

    window.addEventListener('mousemove', (e) => {
      if (moving) {
        // devicePixelRatio fixes zoomed in browser movement.
        left += e.movementX;
        top += e.movementY;
        node.style.top = `${top}px`;
        node.style.left = `${left}px`;
      }
    });

    window.addEventListener('mouseup', () => {
      moving = false;
    });
  }
}