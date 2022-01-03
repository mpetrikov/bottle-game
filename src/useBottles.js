import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { defaultBottleColor } from './constants';

const createEmptyBottle = () => {
    return {
        colors: [defaultBottleColor, defaultBottleColor, defaultBottleColor, defaultBottleColor],
    };
};

/**
 * @param {*} numberOfBottles
 *
 * @return {(Array)}
 */
const generateBottleInfo = (numberOfBottles) => {
    return Array(numberOfBottles)
        .fill(null)
        .map((element, index) => ({
            ...createEmptyBottle(),
            id: index,
        }));
};

export const useBottles = (numberOfBottles) => {
    const [bottles, setBottles] = useState([]);

    const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();

    useEffect(() => {
        setBottles(generateBottleInfo(numberOfBottles));
    }, [numberOfBottles]);

    const setUpBottleColor = useCallback(
        (bottleId, liquidPosition, activeColor) => {
            const newBottleInfo = bottles.map((bottle) => {
                if (bottle.id === bottleId) {
                    return {
                        ...bottle,
                        colors: [
                            ...bottle.colors.slice(0, liquidPosition),
                            activeColor === null ? defaultBottleColor : activeColor.colorName,
                            ...bottle.colors.slice(liquidPosition + 1, 4),
                        ],
                    };
                }

                return bottle;
            });

            setBottles(newBottleInfo);
        },
        [bottles, setBottles],
    );

    const saveBottlesColors = () => {
        saveToLocalStorage('bottles', JSON.stringify(bottles));

        alert('Game field is saved.');
    };

    const loadBottlesColors = () => {
        setBottles(JSON.parse(loadFromLocalStorage('bottles')));
    };

    const checkColorCorrectness = () => {
        // TODO: check
    };

    return {
        bottles,
        setUpBottleColor,
        saveBottlesColors,
        loadBottlesColors,
        checkColorCorrectness,
    };
};
