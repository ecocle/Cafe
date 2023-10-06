import classNames from 'classnames';
import styles from './accounts-not-exist.module.scss';

export interface AccountsNotExistProps {
    className?: string;
}

export const AccountsNotExist = ({ className }: AccountsNotExistProps) => {
    return <div className={classNames(styles.root, className)}>AccountsNotExist</div>;
};
