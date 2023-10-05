import classNames from 'classnames';
import styles from './register.module.scss';
import React from 'react';

export interface RegisterProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Register = ({ className }: RegisterProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.popup}>
                <form>
                    <div className={styles.popupInner}>
                        <label>Username:</label>
                        <br />
                        <input
                            type="text"
                            required
                        />
                        <br />
                        <label>Password:</label>
                        <br />
                        <input
                            type="password"
                            required
                        />
                        <br />
                        <button className={styles.button} type="button" >
                            Create Account!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
