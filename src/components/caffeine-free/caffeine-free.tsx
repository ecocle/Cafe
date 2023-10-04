import classNames from 'classnames';
import styles from './caffeine-free.module.scss';

export interface CaffeineFreeProps {
    className?: string;
    Name: string;
    Price: number;
}

export const CaffeineFree = ({ className, Name, Price }: CaffeineFreeProps) => {
    let PriceLarge = Price + 3;
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.coffee}>
                <h2 className={styles.text}>{Name}</h2>
                <p className={styles.text}>M:{Price}</p>
                <p className={styles.text}>L:{PriceLarge}</p>
            </div>
        </div>
    );
};
