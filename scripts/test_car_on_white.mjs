import sharp from 'sharp';
import fs from 'fs';

async function checkWhiteComposite() {
  const { data, info } = await sharp('test_car_on_white.png').raw().toBuffer({ resolveWithObject: true });
  // Check corner pixels: should be exactly 248, 250, 252 (the background)
  console.log('Corner (0,0):', data[0], data[1], data[2]);
  console.log('Right edge (719, 300):', data[(300 * info.width + 719) * info.channels]);
}
checkWhiteComposite();
