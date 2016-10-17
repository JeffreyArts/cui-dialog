
cuiDialogHelper.addCss = function(){
    var css = "cui-dialog{position:absolute;bottom:0;top:0;left:0;right:0}.cui-dialog--container{position:absolute;width:100%;height:100%;z-index:2;margin:0;background-color:rgba(0,0,0,.5)}.cui-dialog{position:absolute;bottom:24px;top:24px;left:24px;right:24px;padding:48px;z-index:3;background-color:#fff}.cui-dialog--close{display:block;position:absolute;right:0;top:0;height:32px;width:32px;z-index:1;padding:8px;color:#333}.cui-dialog--close:after,.cui-dialog--close:before{width:1px;height:32px;margin:-16px -.5px 0 0;background-color:currentColor;content:'';position:absolute;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);top:50%;left:50%}.cui-dialog--close:before{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.cui-dialog--close:hover{cursor:pointer}.cui-dialog--content{overflow:auto;height:100%}cui-dialog{opacity:0;top:100%}cui-dialog.__isOpen{opacity:1;top:0}@-webkit-keyframes a{0%{color:currentColor}to{color:currentColor}}@keyframes a{0%{color:currentColor}to{color:currentColor}}cui-dialog{-webkit-animation-duration:1ms;animation-duration:1ms;-webkit-animation-name:a;animation-name:a}.cui-dialog{-webkit-transition:transform .45s ease-in-out;transition:transform .45s ease-in-out}";
    if (document.querySelector('style[name="cui-dialog"]') == null) {
        var style = document.createElement('style');
            style.innerText = css;
            style.setAttribute('name', 'cui-dialog');

        var head = document.querySelector('head');
            head.insertBefore(style, head.firstChild);
    }
}

document.addEventListener("DOMContentLoaded", cuiDialogHelper.addCss, false);