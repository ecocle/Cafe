import classNames from 'classnames';
// @ts-ignore
import styles from './coffee.module.scss';

export interface CoffeeProps {
    className?: string;
    name: string;
    price: number;
}

export const Coffee = ({ className, name, price }: CoffeeProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.coffee}>
                <h2>{name}</h2>
                <p>{price}</p>
            </div>
        </div>
    );
};
