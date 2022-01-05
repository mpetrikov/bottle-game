import { defaultBottleColor } from './constants';
import { getLiquidInfoFromTop, getTopSpaceInfo } from './getLiquidInfo';
import { copyBottles } from './copyBottles';

const checkGameFinished = (bottles) => {
    return bottles.every((bottle) => {
        return (
            bottle.colors[0] === bottle.colors[1] &&
            bottle.colors[1] === bottle.colors[2] &&
            bottle.colors[2] === bottle.colors[3]
        );
    });
};

const generateStateOfLevel = (bottles) => {
    return bottles.map((bottle) => bottle.colors.join(',')).join(',');
};

const findAllMovements = (bottles) => {
    const topLiquidsInfo = bottles.map((bottle) => getLiquidInfoFromTop(bottle.colors));
    const topSpacesInfo = bottles.map((bottle) => getTopSpaceInfo(bottle.colors));

    const movementsInfo = [];
    for (let i = 0; i < topLiquidsInfo.length; i++) {
        const topLiquidInfo = topLiquidsInfo[i];
        if (topLiquidInfo && topLiquidInfo.size === 4) {
            continue;
        }

        for (let j = 0; j < topSpacesInfo.length; j++) {
            if (i === j) continue;

            const topSpaceInfo = topSpacesInfo[j];

            if (topSpaceInfo === null) continue;

            // remove full transfusion from one bottle to empty
            if (
                topSpaceInfo.size === 4 &&
                (topLiquidInfo === null || topLiquidInfo.size + topLiquidInfo.position === 4)
            ) {
                continue;
            }

            if (
                topLiquidInfo !== null &&
                (topSpaceInfo.availableColor === null ||
                    (topSpaceInfo.availableColor === topLiquidInfo.color && topLiquidInfo.size <= topSpaceInfo.size))
            ) {
                movementsInfo.push([i, j]);
            }
        }
    }

    return movementsInfo;
};

const doMove = (bottles, movement) => {
    const newBottles = copyBottles(bottles);

    const bottleFrom = newBottles[movement[0]];
    const bottleTo = newBottles[movement[1]];

    const bottleFromInfo = getLiquidInfoFromTop(bottleFrom.colors);
    const bottleToInfo = getTopSpaceInfo(bottleTo.colors);

    for (let i = 0; i < bottleFromInfo.size; i++) {
        bottleTo.colors[bottleToInfo.size - 1 - i] = bottleFrom.colors[bottleFromInfo.position + i];
        bottleFrom.colors[bottleFromInfo.position + i] = defaultBottleColor;
    }

    return newBottles;
};

export const useSolveLevel = () => {
    const solveLevel = (bottles) => {
        let bottlesPosition = [{ bottles, moves: [] }];
        const positionHashes = { [generateStateOfLevel(bottles)]: true };

        let isLevelSolved = false;
        let levelSolution = null;

        while (bottlesPosition.length > 0) {
            const currentPositionInfo = bottlesPosition.shift();

            const allMovements = findAllMovements(currentPositionInfo.bottles);

            for (let i = 0; i < allMovements.length; i++) {
                const newPosition = doMove(currentPositionInfo.bottles, allMovements[i]);
                const newMoves = [...currentPositionInfo.moves, allMovements[i]];

                if (checkGameFinished(newPosition)) {
                    levelSolution = newMoves;
                    isLevelSolved = true;
                    break;
                }

                const newPositionHash = generateStateOfLevel(newPosition);
                if (positionHashes[newPositionHash]) continue;

                positionHashes[newPositionHash] = true;
                bottlesPosition = [{ bottles: newPosition, moves: newMoves }, ...bottlesPosition];
            }

            if (isLevelSolved) break;
        }

        return levelSolution;
    };

    return {
        solveLevel,
    };
};
