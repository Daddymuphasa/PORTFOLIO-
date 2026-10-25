/** Square cover crop through createImageBitmap. 1024 on desktop, 512 on a small screen. */

export async function rasterizeImage(file: Blob, size: number): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Could not read that picture");
    const scale = Math.max(size / bitmap.width, size / bitmap.height);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(bitmap, (size - width) / 2, (size - height) / 2, width, height);
    return new Uint8Array(ctx.getImageData(0, 0, size, size).data);
  } finally {
    bitmap.close();
  }
}
