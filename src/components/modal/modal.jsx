import React from 'react';
import PropsTypes from 'prop-types';
import styles from './modal.less';

class Modal extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { children } = this.props;
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        )
    }
}

Modal.defaultProps = {
    children: <div></div>
}

Modal.propsTypes = {
    children: PropsTypes.element
}

export default Modal;