export const render = (function() {
  const size = 32;
  const font = `26px Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;

  let internalCanvas;

  return function(emoji, options = {}) {
    let canvas = options.canvas;

    if (!canvas) {
      internalCanvas =
        internalCanvas === undefined
          ? document.createElement('canvas')
          : internalCanvas;
      canvas = internalCanvas;
    }

    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = options.color || '#000';
    context.font = font;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(emoji, size / 2, size / 2 + 2);

    return canvas.toDataURL('image/png');
  };
})();

export function set(emoji, options = {}) {
  const dataUrl = render(emoji, options);
  const link = document.querySelector(
    `link[id="${options.linkId || 'emojicon'}"]`
  );

  if (link) {
    link.href = dataUrl;
  } else {
    throw new Error(
      'No <link> element with id "emojicon" found to attach favicon'
    );
  }
}
