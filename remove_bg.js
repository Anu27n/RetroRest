const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets');
const files = ['aeroplane.png', 'bicycle.png', 'leaves.png', 'teapot.png'];

async function processImages() {
  for (const file of files) {
    const filePath = path.join(imgDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }
    
    console.log(`Processing ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];
        
        if (a === 0) return; 
        
        // Checkerboards are almost pure greyscale (white and light grey)
        const isGrey = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25;
        
        // If it's a light grey or white, erase it cleanly
        if (isGrey && Math.max(r, g, b) > 160) {
            this.bitmap.data[idx + 3] = 0; // Set alpha to completely transparent
        }
      });
      
      await image.writeAsync(filePath);
      console.log(`Processed and completely erased background for: ${file}`);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

processImages();
