import posterImg from '../images/poster_bg.png';
import { dataURL2ObjUrl } from './utils';
import QRCode from 'qrcode';

export function drawPotser(canvas, options) {
    if (!canvas) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }

    //init
    const config = options || {};
    canvas.width = config.width || 750 * 2;
    canvas.height = config.height || 1200 * 2;
    const ctx = canvas.getContext('2d');

    //定义所用常量
    const BACKGROUND_IMG = posterImg;
    const QRCODE_TEXT = "hello world!";

    //qrcode
    function getQrcodeUrl(text) {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(text).then(url => {
                resolve(loadImg(dataURL2ObjUrl(url)))
            }).catch(err => {
                console.error(err)
                reject(err)
            })
        })
    }

    //loadImg
    function loadImg(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            //if ios9 need disabled
            // image.crossOrigin = 'anonymous';
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (err) => {
                reject(err);
            }
        })
    }

    //添加图片
    function drawImg(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        ctx.save();
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.restore();
    }

    //添加文字
    function drawText() {
        ctx.save();
        //设置字体
        ctx.font = "100px serif";
        ctx.fillText("Hello world", 400, 1700);
        ctx.restore();
    }

    return new Promise((resolve, reject) => {
        const promiseArr = [loadImg(BACKGROUND_IMG), getQrcodeUrl(QRCODE_TEXT)]
        Promise.all(promiseArr).then(values => {
            const posterImg = values[0];
            const qrcodeImg = values[1];
            //添加背景图&qrcode
            drawImg(posterImg, 0, 0, posterImg.width, posterImg.height, 0, 0, canvas.width, canvas.height);
            drawImg(qrcodeImg, 0, 0, qrcodeImg.width, qrcodeImg.height, 1000, 1940, qrcodeImg.width * 3, qrcodeImg.height * 3);
            //添加文字
            drawText();

            //返回值
            window.requestAnimationFrame(() => {
                resolve();
            });
        });
    })
}