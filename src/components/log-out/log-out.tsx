import classNames from 'classnames';
import styles from './log-out.module.scss';

export interface Log_OutProps {
    className?: string;
}

export const Log_Out = ({ className }: Log_OutProps) => {
    return <div className={classNames(styles.root, className)}>Log_Out</div>;
};
