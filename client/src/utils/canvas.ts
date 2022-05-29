import html2canvas from "html2canvas";

export const downloadImage = (
  captureElement: HTMLElement,
  width: number,
  height: number,
  x: number,
  y: number
) => {
  html2canvas(captureElement, {
    width,
    height,
    x,
    y,
  })
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
};
