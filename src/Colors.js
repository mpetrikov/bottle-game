import { useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './colors.module.css';

export const Colors = ({ colors: colorsData, activeColorId, chooseColor }) => {
    const chooseColorLocal = useCallback(
        (e) => {
            const dataColorId = e.target.getAttribute('data-color-id');
            if (dataColorId === null) return;

            chooseColor(Number(dataColorId));
        },
        [chooseColor],
    );

    return (
        <div className={styles.colorsLine} onClick={chooseColorLocal}>
            {colorsData.map((colorData) => (
                <div
                    data-color-id={colorData.id}
                    key={colorData.id}
                    className={cn(styles.color, {
                        [styles.colorActive]: activeColorId === colorData.id,
                    })}
                    style={{ backgroundColor: colorData.colorName }}
                ></div>
            ))}
        </div>
    );
};

Colors.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.shape({ colorName: PropTypes.string, id: PropTypes.number })).isRequired,
    activeColorId: PropTypes.number,
    chooseColor: PropTypes.func.isRequired,
};
