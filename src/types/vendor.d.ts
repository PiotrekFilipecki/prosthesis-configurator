declare module 'html2canvas' {
  export default function html2canvas(element: HTMLElement): Promise<HTMLCanvasElement>;
}

declare module 'jspdf' {
  export interface JsPdfLike {
    setFontSize(size: number): void;
    text(text: string | string[], x: number, y: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    addPage(format?: string, orientation?: string): void;
    splitTextToSize(text: string, size: number): string[];
    addImage(
      imageData: HTMLCanvasElement,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number,
      alias?: string,
      compression?: string
    ): void;
    setFont(fontName: string): void;
    save(filename: string): void;
  }

  export interface JsPdfConstructor {
    new (): JsPdfLike;
  }

  export const jsPDF: JsPdfConstructor;
  const defaultExport: JsPdfConstructor;
  export default defaultExport;
}
