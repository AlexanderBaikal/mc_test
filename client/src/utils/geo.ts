interface IGeo {
  type: String;
  geometry: { type: String; coordinates: Array<Number> };
  properties: { title: String; image: String };
}

export const toGeoJsonPoint = (
  latlng: Array<Number>,
  title: String,
  image: String
): IGeo => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: latlng,
    },
    properties: {
      title,
      image,
    },
  };
};
