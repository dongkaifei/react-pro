import React from 'react';
import styles from './home.less'
import Modal from '../../components/modal/modal.jsx'

class Home extends React.Component {
    constructor() {
        super();
    }
    modalChildren() {
        return <div>这只是一个测试</div>
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.group}>test</div>
                <Modal children={this.modalChildren()} />
            </div>
        )
    }
}

export default Home