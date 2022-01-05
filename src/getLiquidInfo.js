import { defaultBottleColor } from './constants';

export const getLiquidInfoFromTop = (colors) => {
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

export const getTopSpaceInfo = (colors) => {
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
