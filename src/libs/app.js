function initApp() {
    // rem布局，body:font-size初始化
    (function () {
        var doc = document;
        var win = window;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var _w = doc.documentElement.clientWidth || doc.body.clientWidth
                _w = _w > 640 ? 640 : _w
                var _size = _w / 750 * 100
                _size = _size < 60 ? _size : 60
                doc.documentElement.style.fontSize = _size + 'px'
            };
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })();
}

export default initApp;