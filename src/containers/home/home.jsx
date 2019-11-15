import React from 'react'
import styles from './home.less'
import Modal from '../../components/modal/modal.jsx'
import { connect } from 'react-redux'
import { increment, toggle } from '../../actions/home'
import bindAll from 'lodash.bindall';

class Home extends React.Component {
    constructor() {
        super();
        bindAll(this, ['handleClick', 'toggleShow']);
    }

    componentDidMount() {
        console.log(this.props.counter)
    }

    handleClick() {
        this.props.increment();
    }

    toggleShow() {
        this.props.toggle();
    }

    modalChildren() {
        const { counter, showStatus } = this.props;
        return (
            <div>
                <div onClick={this.toggleShow}>这只是一个测试{counter}</div>
                {showStatus ? <button onClick={this.handleClick}>click it</button> : null}
            </div>
        )
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

const mapStateToProps = (state, /* ownProps */) => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    increment: () => {
        setTimeout(() => {
            dispatch(increment())
        }, 1000)
    },
    toggle: () => dispatch(toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)