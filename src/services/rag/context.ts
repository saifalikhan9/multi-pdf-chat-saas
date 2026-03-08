export function buildContext(docs: any[]) {
    return docs
      .map(
        (d) =>
          `[Doc: ${d.metadata.docName} | Chunk ${d.metadata.chunk}]
  ${d.text}`
      )
      .join("\n\n");
  }