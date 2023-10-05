import classNames from 'classnames';
import styles from './order-table.module.scss';

export interface Order_tableProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Order_table = ({ className }: Order_tableProps) => {
    return <div className={classNames(styles.root, className)}>
        <div>
            <p>This is a paragraph.</p>
        </div>
    </div>;
};
