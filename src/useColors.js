import { useState, useCallback } from "react";

export const useColors = () => {
  const [colors] = useState([
    { colorName: "cyan", id: 0 },
    { colorName: "gray", id: 1 },
    { colorName: "orange", id: 2 },
    { colorName: "blue", id: 3 },
    { colorName: "deepskyblue", id: 4 },
    { colorName: "brown", id: 5 },
    { colorName: "red", id: 6 },
    { colorName: "plum", id: 7 },
    { colorName: "lightgreen", id: 8 },
    { colorName: "olivedrab", id: 9 },
    { colorName: "green", id: 10 },
    { colorName: "yellow", id: 11 },
  ]);

  const [activeColorId, setActiveColorId] = useState(null);

  const getActiveColor = () => {
    if (activeColorId === null) return null;

    const activeColor = colors.filter((color) => color.id === activeColorId);
    if (activeColor.length !== 1) console.err("More than one color was chosen");

    return activeColor[0];
  };

  const chooseColor = useCallback(
    (colorId) => {
      if (colorId === activeColorId) {
        setActiveColorId(null);
      } else {
        setActiveColorId(colorId);
      }
    },
    [activeColorId]
  );

  return {
    colors,
    activeColorId,
    chooseColor,
    getActiveColor,
  };
};
