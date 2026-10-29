import sharp from 'sharp';
import fs from 'fs';

async function processLightStudioUpward() {
  const sourcePath = 'C:\\Users\\maste\\.gemini\\antigravity\\brain\\6d4e6cbb-8086-4332-bf13-6abefaf1927e\\coming_soon_car_light_studio_upward_1793306745100.jpg';

  const meta = await sharp(sourcePath).metadata();
  console.log('Dims:', meta.width, meta.height);

  const width = meta.width;
  const height = meta.height;

  // Let's create an SVG with the MasterTech official brand placed cleanly in the top open area
  const svgText = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Metallic gold / dark bronze gradient matching luxury light theme -->
      <linearGradient id="goldDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#9A6B0A"/>
        <stop offset="35%" stop-color="#B8860B"/>
        <stop offset="70%" stop-color="#855800"/>
        <stop offset="100%" stop-color="#553500"/>
      </linearGradient>

      <!-- Slate gradient for micro subtitle -->
      <linearGradient id="slateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>

      <!-- Soft ambient shadow -->
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#ffffff" flood-opacity="0.9"/>
      </filter>
    </defs>

    <!-- Top micro label: SOLUCIONES AUTOMOTRICES -->
    <text 
      x="${Math.round(width / 2)}" 
      y="42" 
      text-anchor="middle" 
      fill="url(#slateGrad)" 
      font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
      font-size="13" 
      font-weight="800" 
      letter-spacing="5"
      filter="url(#softGlow)"
      opacity="0.95"
    >
      SOLUCIONES AUTOMOTRICES
    </text>

    <!-- Main brand title: TALLER MASTERTECH -->
    <text 
      x="${Math.round(width / 2)}" 
      y="78" 
      text-anchor="middle" 
      fill="url(#goldDarkGrad)" 
      font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
      font-size="30" 
      font-weight="900" 
      letter-spacing="4"
      filter="url(#softGlow)"
    >
      TALLER MASTERTECH
    </text>
  </svg>
  `;

  await sharp(sourcePath)
    .composite([
      { input: Buffer.from(svgText), top: 0, left: 0 }
    ])
    .webp({ quality: 92 })
    .toFile('public/assets/coming_soon_car_light_studio.webp');

  console.log('Successfully generated public/assets/coming_soon_car_light_studio.webp');
}

processLightStudioUpward();
