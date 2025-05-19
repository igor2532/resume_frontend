import React, { useEffect, useRef } from 'react';

type TCanvasImageProps = {
  path: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
};

const CanvasComponent: React.FC<TCanvasImageProps> = ({ path, width, height, style }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = path; // Замените на путь к вашему изображению
    image.onload = () => {
      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageRatio > canvasRatio) {
        drawWidth = canvas.height * imageRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context?.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };
  }, [path]);

  return <canvas style={style} ref={canvasRef} width={width} height={height}></canvas>;
};

export default CanvasComponent;
