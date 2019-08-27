import React from 'react';
import styles from './poster.less';
import { drawPotser } from '../../libs/poster';

class Poster extends React.Component {
    constructor(props) {
        super(props);
        //init state
        this.state = {
            imgUrl: ""
        }
    }
    componentDidMount() {
        const canvas = document.getElementById('canvas');
        drawPotser(canvas).then(() => {
            const imgUrl = canvas.toDataURL("image/png");
            this.setState({
                imgUrl
            })
        });
    }
    render() {
        return (
            <div className={styles.container}>
                {
                    this.state.imgUrl ? <img src={this.state.imgUrl} /> : <canvas id="canvas"></canvas>
                }
            </div>
        )
    }
}

export default Poster