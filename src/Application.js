import { useState, useCallback } from "react";

import { Colors } from "./Colors";

import { useColors } from "./useColors";

export function Application() {
  const { colors, activeColorId, chooseColor, getActiveColor } = useColors();

  // const [bottlesCount] = useState({
  //   line1BottlesNumber: 7,
  //   line2BottlesNumber: 7,
  // });

  return (
    <div>
      <Colors
        colors={colors}
        chooseColor={chooseColor}
        activeColorId={activeColorId}
      />
    </div>
  );
}
