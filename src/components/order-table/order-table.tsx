import classNames from 'classnames';
import styles from './order-table.module.scss';

export interface Order_tableProps {
    className?: string;
}

export const Order_table = ({ className }: Order_tableProps) => {
    return <div className={classNames(styles.root, className)}>
        <div>
            <p>This is a paragraph.</p>
        </div>
    </div>;
};
