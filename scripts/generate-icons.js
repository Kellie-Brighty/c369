import sharp from "sharp";

const sizes = [192, 512];

async function generateIcons() {
  for (const size of sizes) {
    await sharp("public/logo.jpg")
      .resize(size, size)
      .toFile(`public/icon-${size}.png`);
  }
}

generateIcons();
