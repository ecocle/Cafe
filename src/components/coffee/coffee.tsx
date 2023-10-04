import classNames from 'classnames';
import styles from './coffee.module.scss';

export interface CoffeeProps {
    className?: string;
    Name: string;
    Price: number;
}

export const Coffee = ({ className, Name, Price }: CoffeeProps) => {
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
