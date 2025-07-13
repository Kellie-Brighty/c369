import sharp from 'sharp';
import fs from 'fs';

// Create a screenshot from the current view
const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 667;
const ctx = canvas.getContext('2d');

// Fill with background color
ctx.fillStyle = '#1A1A1A';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Save as PNG
const buffer = canvas.toDataURL('image/png');
fs.writeFileSync('public/screenshot-home.png', Buffer.from(buffer.split(',')[1], 'base64')); 