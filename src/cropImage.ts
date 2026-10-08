export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => {
      const fallback = new Image();
      fallback.addEventListener('load', () => resolve(fallback));
      fallback.addEventListener('error', (error) => reject(error));
      fallback.src = url;
    });
    if (!url.startsWith('data:')) {
      image.setAttribute('crossOrigin', 'anonymous');
    }
    image.src = url;
  });

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  aspectRatio: number = 4/3,
  maxDimension: number = 800,
  quality: number = 0.80
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  let targetWidth = pixelCrop.width;
  let targetHeight = pixelCrop.height;

  if (maxDimension > 0 && (targetWidth > maxDimension || targetHeight > maxDimension)) {
    if (targetWidth > targetHeight) {
      targetHeight = Math.round((targetHeight * maxDimension) / targetWidth);
      targetWidth = maxDimension;
    } else {
      targetWidth = Math.round((targetWidth * maxDimension) / targetHeight);
      targetHeight = maxDimension;
    }
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  // Exportar como WebP optimizado (pesa 70-80% menos que JPEG/PNG)
  try {
    const webpData = canvas.toDataURL('image/webp', quality);
    if (webpData.startsWith('data:image/webp')) {
      return webpData;
    }
  } catch (e) {}

  return canvas.toDataURL('image/jpeg', quality);
}
