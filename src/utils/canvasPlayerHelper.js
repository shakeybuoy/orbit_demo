export const FRAME_COUNT = 200;

// ------------------------------- preload images ------------------------------ //

export const preloadImages = async (
  start = 1,
  folderName = "orbit-images",
  imagePrefix = "ezgif-frame",
  format = "jpg"
) => {
  const images = [];
  for (let i = start; i <= FRAME_COUNT; i++) {
    const frame = i.toString().padStart(3, "0");
    const src = `./assets/${folderName}/${imagePrefix}-${frame}.${format}`;
    const img = new Image();
    img.src = src;
    await new Promise((resolve) => (img.onload = resolve));
    images.push(img);
  }
  return images;
};

// ------------------------------- render images to frame ------------------------------ //

export const renderFrame = (canvas, images, progress) => {
  if (!canvas || images.length === 0) return;

  const ctx = canvas.getContext("2d");
  const frameIndex = Math.min(
    Math.floor(progress * (FRAME_COUNT - 1)),
    FRAME_COUNT - 1
  );

  const image = images[frameIndex];
  if (image) {
    const canvasAspect = ctx.canvas.width / ctx.canvas.height;
    const imageAspect = image.width / image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let renderWidth, renderHeight;
    if (imageAspect > canvasAspect) {
      renderWidth = ctx.canvas.width;
      renderHeight = renderWidth / imageAspect;
    } else {
      renderHeight = ctx.canvas.height;
      renderWidth = renderHeight * imageAspect;
    }

    const offsetX = (ctx.canvas.width - renderWidth) / 2;
    const offsetY = (ctx.canvas.height - renderHeight) / 2;

    ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
  }
};

// ------------------------------- resize canvas ------------------------------ //

export const resizeCanvas = (canvas, container) => {
  if (canvas && container) {
    const containerWidth = container.offsetWidth;
    canvas.width = containerWidth;
    canvas.height = containerWidth * (9 / 16); // 16:9
  }
};
