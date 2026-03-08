import PDFParser from "pdf2json";

export async function pdfparser(buffer: Uint8Array): Promise<string> {
    const pdfParser = new (PDFParser as any)(null, 1);

    const parsedText: string = await new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataReady", () => {
            const text = (pdfParser as any).getRawTextContent();
            resolve(text);
        });

        pdfParser.on("pdfParser_dataError", (err: any) => {
            reject(err?.parserError || err);
        });

        // ✅ parse directly from memory
        pdfParser.parseBuffer(buffer);
    });
    return parsedText
}