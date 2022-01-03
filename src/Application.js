import { useState, useCallback } from 'react';

import { Colors } from './Colors';
import { Bottles } from './Bottles';

import { useColors } from './useColors';
import { useBottles } from './useBottles';
import { useSolveLevel } from './useSolveLevel';

export function Application() {
    const [bottlesCount] = useState(9);

    const { colors, activeColorId, chooseColor, getActiveColor } = useColors(bottlesCount);
    const { bottles, setUpBottleColor, saveBottlesColors, loadBottlesColors } = useBottles(bottlesCount);

    const { solveLevel } = useSolveLevel();

    const chooseColorFromBottle = useCallback(
        (bottleId, liquidPosition) => {
            const activeColor = getActiveColor();

            setUpBottleColor(bottleId, liquidPosition, activeColor);
        },
        [getActiveColor, setUpBottleColor],
    );

    const solveLevelCallback = useCallback(() => {
        solveLevel(bottles);
    }, [solveLevel, bottles]);

    return (
        <div>
            <div>
                <button onClick={saveBottlesColors}>Save game field</button>
            </div>
            <div>
                <button onClick={loadBottlesColors}>Load game field</button>
            </div>
            <div>
                <button onClick={solveLevelCallback}>Solve level</button>
            </div>
            <Colors colors={colors} chooseColor={chooseColor} activeColorId={activeColorId} />

            <Bottles bottlesInfo={bottles} chooseColor={chooseColorFromBottle}></Bottles>
        </div>
    );
}
