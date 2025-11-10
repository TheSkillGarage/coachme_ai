/// <reference types="vite/client" />

declare module "pdfjs-dist/build/pdf.worker.mjs?worker" {
    const workerConstructor: new () => Worker;
    export default workerConstructor;
  }
  