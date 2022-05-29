import { toGeoJsonPoint } from "@/utils/geo";

describe("text rendering", () => {
  beforeAll(() => {});

  it("displays proper button text", () => {
    const imageData = "data:image/bmp;base64...";
    const result = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10, 10],
      },
      properties: {
        title: "sample",
        image: imageData,
        iconSize: 0.5,
      },
    };
    expect(toGeoJsonPoint([10, 10], "sample", imageData)).toEqual(result);
  });
});
