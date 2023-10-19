import classNames from 'classnames';
import styles from './log-out.module.scss';

export interface Log_OutProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Log_Out = ({ className }: Log_OutProps) => {
    return <div className={classNames(styles.root, className)}>Log_Out</div>;
};
