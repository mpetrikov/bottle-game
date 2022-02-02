import { useCallback } from 'react';

import PropTypes from 'prop-types';
import styles from './bottles-line.module.css';
import { numberOfBottlesInFirstLine } from './constants';

import { Bottle } from './Bottle';

export const Bottles = ({ bottlesInfo, chooseColor }) => {
    const chooseColorLocal = useCallback(
        (e) => {
            const bottleId = e.target.parentElement.getAttribute('data-bottle-id');
            const liquidPosition = e.target.getAttribute('data-liquid-position');

            if (bottleId === null || liquidPosition === null) return;

            chooseColor(Number(bottleId), Number(liquidPosition));
        },
        [chooseColor],
    );

    return (
        <>
            <div className={styles.bottleLine} onClick={chooseColorLocal}>
                {bottlesInfo.slice(0, numberOfBottlesInFirstLine).map((bottleInfo) => (
                    <Bottle bottleId={bottleInfo.id} key={bottleInfo.id} colors={bottleInfo.colors} />
                ))}
            </div>
            <div className={styles.bottleLine} onClick={chooseColorLocal}>
                {bottlesInfo.slice(numberOfBottlesInFirstLine).map((bottleInfo) => (
                    <Bottle bottleId={bottleInfo.id} key={bottleInfo.id} colors={bottleInfo.colors} />
                ))}
            </div>
        </>
    );
};

Bottles.propTypes = {
    bottlesInfo: PropTypes.arrayOf(PropTypes.shape({ colors: PropTypes.arrayOf(PropTypes.string) })).isRequired,
    chooseColor: PropTypes.func,
};
