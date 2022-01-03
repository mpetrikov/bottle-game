import PropTypes from 'prop-types';
import styles from './bottle.module.css';

export const Bottle = ({ colors, bottleId }) => {
    return (
        <div className={styles.bottle} data-bottle-id={bottleId}>
            {colors.map((color, index) => (
                <div
                    key={`${index}_${color}`}
                    data-liquid-position={index}
                    className={styles.bottleLiquid}
                    style={{ backgroundColor: color }}
                >
                    {bottleId}
                </div>
            ))}
        </div>
    );
};

Bottle.propTypes = { colors: PropTypes.arrayOf(PropTypes.string) };
