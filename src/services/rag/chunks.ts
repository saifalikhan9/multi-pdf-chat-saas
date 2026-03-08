export function chunkText(text: string, size = 800, overlap = 100) {
    const chunks: string[] = [];
  
    let start = 0;
    while (start < text.length) {
      chunks.push(text.slice(start, start + size));
      start += size - overlap;
    }
  
    return chunks;
  }