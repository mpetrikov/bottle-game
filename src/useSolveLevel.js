import { defaultBottleColor } from './constants';

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

const getLiquidInfoFromTop = (colors) => {
    let isEmpty = colors.every((color) => color === defaultBottleColor);
    if (isEmpty) return null;

    let colorPosition = 0;
    while (colors[colorPosition] === defaultBottleColor) colorPosition++;

    const topColor = colors[colorPosition];
    let size = 1;

    for (let i = colorPosition + 1; i < colors.length; i++) {
        if (topColor === colors[i]) size++;
        else break;
    }

    return { color: topColor, size, position: colorPosition };
};

const getTopSpaceInfo = (colors) => {
    if (colors[0] !== defaultBottleColor) return null;

    const topColor = defaultBottleColor;
    let size = 1;

    for (let i = 1; i < colors.length; i++) {
        if (topColor === colors[i]) size++;
        else break;
    }

    let availableColor = null;
    if (size !== 4) {
        availableColor = colors[size];
    }

    return { size, availableColor };
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

const copyBottles = (bottles) => {
    return bottles.map((bottle) => ({ colors: [...bottle.colors], id: bottle.id }));
};

const doMove = (bottles, movement) => {
    const newBottles = copyBottles(bottles);

    const bottleFrom = newBottles[movement[0]];
    const bottleTo = newBottles[movement[1]];

    const bottleFromInfo = getLiquidInfoFromTop(bottleFrom.colors);
    const bottleToInfo = getTopSpaceInfo(bottleTo.colors);

    const bottleFromInfo1 = getLiquidInfoFromTop(bottleFrom.colors);

    for (let i = 0; i < bottleFromInfo.size; i++) {
        bottleTo.colors[bottleToInfo.size - 1 - i] = bottleFrom.colors[bottleFromInfo.position + i];
        bottleFrom.colors[bottleFromInfo.position + i] = defaultBottleColor;
    }

    return newBottles;
};

export const useSolveLevel = () => {
    const solveLevel = (bottles) => {
        const bottlesPosition = [{ bottles, moves: [] }];
        const positionHashes = { [generateStateOfLevel(bottles)]: true };

        let isLevelSolved = false;
        let levelSolution = null;

        while (bottlesPosition.length > 0) {
            const currentPositionInfo = bottlesPosition.shift();
            // console.log('moves size', currentPositionInfo.moves.length);
            // console.log('positionHashes length', Object.keys(positionHashes).length);

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
                bottlesPosition.push({ bottles: newPosition, moves: newMoves });
            }

            if (isLevelSolved) break;
        }

        console.log('levelSolution', levelSolution);
    };

    return {
        solveLevel,
    };
};
