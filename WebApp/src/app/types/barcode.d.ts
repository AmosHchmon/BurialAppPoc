declare class BarcodeDetector {
  constructor(options?: { formats: string[] });

  detect(
    image: ImageBitmapSource
  ): Promise<Array<{ rawValue: string; format: string }>>;
}

interface Window {
  BarcodeDetector: typeof BarcodeDetector;
}
