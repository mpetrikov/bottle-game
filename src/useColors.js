import { useState, useCallback } from 'react';

export const useColors = (numberOfBottles) => {
    const [colors] = useState([
        { colorName: '#EC8B3E', id: 2 },
        { colorName: '#3B2FC3', id: 10 },
        { colorName: '#C52B23', id: 4 },
        { colorName: '#63D57D', id: 0 },
        { colorName: '#EA5E7B', id: 8 },
        { colorName: '#626365', id: 1 },
        { colorName: '#55A3E5', id: 7 },
        { colorName: '#F1DA57', id: 3 },
        { colorName: '#722B93', id: 5 },
        { colorName: '#78970F', id: 6 },
        { colorName: '#7D4A08', id: 9 },
        { colorName: '#205B39', id: 11 },
    ]);

    const [activeColorId, setActiveColorId] = useState(null);

    const getActiveColor = () => {
        if (activeColorId === null) return null;

        let activeColor = null;
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].id === activeColorId) {
                if (activeColor !== null) {
                    console.error('More than one color was chosen');
                    continue;
                }
                if (i >= numberOfBottles - 1) {
                    console.error('Using color which is out of range');
                }

                activeColor = colors[i];
            }
        }

        return activeColor;
    };

    const chooseColor = useCallback(
        (colorId) => {
            if (colorId === activeColorId) {
                setActiveColorId(null);
            } else {
                setActiveColorId(colorId);
            }
        },
        [activeColorId],
    );

    const usingColors = useCallback(() => colors.slice(0, numberOfBottles - 2), [colors, numberOfBottles]);

    return {
        colors: usingColors(),
        activeColorId,
        chooseColor,
        getActiveColor,
    };
};
