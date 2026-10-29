import sharp from 'sharp';
import fs from 'fs';

async function testCleanLightCar() {
  // Let's inspect coming_soon_car_mastertech.webp
  const img = sharp('public/assets/coming_soon_car_mastertech.webp');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  console.log('coming_soon_car_mastertech info:', info);
}

testCleanLightCar();
