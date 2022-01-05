import { useState, useCallback } from 'react';

import { Colors } from './Colors';
import { Bottles } from './Bottles';

import { useColors } from './useColors';
import { useBottles } from './useBottles';
import { useSolveLevel } from './useSolveLevel';

import { numberOfBottles } from './constants';

export function Application() {
    const [bottlesCount] = useState(numberOfBottles);
    const [levelSolution, setLevelSolution] = useState(null);
    const [currentSolutionMove, setCurrentSolutionMove] = useState(0);

    const { colors, activeColorId, chooseColor, getActiveColor } = useColors(bottlesCount);
    const { bottles, setUpBottleColor, saveBottlesColors, loadBottlesColors, moveLiquid } = useBottles(bottlesCount);

    const { solveLevel } = useSolveLevel();

    const chooseColorFromBottle = useCallback(
        (bottleId, liquidPosition) => {
            const activeColor = getActiveColor();

            setUpBottleColor(bottleId, liquidPosition, activeColor);
        },
        [getActiveColor, setUpBottleColor],
    );

    const solveLevelCallback = useCallback(() => {
        const levelSolutionLocal = solveLevel(bottles);
        setLevelSolution(levelSolutionLocal);
    }, [solveLevel, bottles]);

    const doSolutionMove = useCallback(() => {
        const currentMove = levelSolution[currentSolutionMove];
        moveLiquid(currentMove[0], currentMove[1]);
        setCurrentSolutionMove(currentSolutionMove + 1);
    }, [levelSolution, currentSolutionMove, moveLiquid]);

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
            {levelSolution && (
                <div>
                    <p>
                        A solution has been found! Move(s) until the end: {levelSolution.length - currentSolutionMove}
                    </p>
                    <p>
                        <button onClick={doSolutionMove}>Do move</button>
                    </p>
                </div>
            )}

            <Colors colors={colors} chooseColor={chooseColor} activeColorId={activeColorId} />

            <Bottles bottlesInfo={bottles} chooseColor={chooseColorFromBottle}></Bottles>
        </div>
    );
}
