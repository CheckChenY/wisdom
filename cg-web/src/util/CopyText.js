//拷贝插件 kay
// import iView from 'iview';
import Clipboard from 'clipboard';
let CopyText = new Object();
CopyText.install = function (Vue, options) {
    // 4. 添加实例方法
    // text,    要copy的文本
    // success, 成功回调函数
    // error    失败回调函数
    Vue.prototype.$CopyText = function (text, success, error) {
        // 逻辑...
        let oCopyBtn = document.createElement('button');
        oCopyBtn.setAttribute('id', 'copy-btn');
        oCopyBtn.setAttribute('data-clipboard-text', text);
        document.body.appendChild(oCopyBtn);
        var clipboard = new Clipboard('#copy-btn');
        clipboard.on('success', e => {
            success(e);
            // console.log('复制成功');
            // iView.Message.success(`复制成功！`);
            // 释放内存
            clipboard.destroy();
            //移除节点
            document.body.removeChild(oCopyBtn);
        });
        clipboard.on('error', e => {
            error(e);
            // 不支持复制
            //console.log('该浏览器不支持自动复制')
            // iView.Message.error(`复制失败！`);
            // 释放内存
            clipboard.destroy();
            //移除节点
            document.body.removeChild(oCopyBtn);
        });
        //模拟点击
        oCopyBtn.click();
    }
};

export default CopyText;