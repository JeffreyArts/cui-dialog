// cui Dialog API

var cuiDialog = function(name) {

    var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
    if (dialogDom === null) {
        console.error('No cui-dialog found with name `' + name + '`');
    }

    return {
        // Opens a targeted dialog;
        open: function() {
            dialogDom.open();
            return dialogDom;
        },

        // Closes a targeted dialog;
        close: function() {
            dialogDom.close();
            return dialogDom;
        },

        // Toggle the state of a targeted dialog;
        toggle: function() {
            dialogDom.toggle();
            return dialogDom;
        },

        // Update the content of the dialog with `value`
        updateContent: function(value) {
            dialogDom.updateContent(value);
            return dialogDom;
        },

        // Get the content of the targeted dialog
        getContent: function() {
            return dialogDom.getContent();
        }
    }
}
var cuiDialogHelper = {}


// Deprecated function > Move to readme
// toggleBodyClass: function(domElement){
//     var body = document.querySelector('body');
//     if (domElement.state == 'open' && body.className.indexOf('activeDialog') == -1) {
//         body.className += ' activeDialog';
//     }
//     if (domElement.state == 'closed' && body.className.indexOf('activeDialog') !== -1) {
//         body.className = body.className.replace('activeDialog', '');
//     }
// },
// Helper function for setting up the required changes to the `cui-dialog` domElement
cuiDialogHelper.initialize = function(domElement) {
    if (domElement.initialized ||  domElement.querySelector('.cui-dialog--container') !== null) {
        return;
    }


    // Add state functionality
    domElement.state  = 'closed';

    domElement.close  = function(){
        cuiDialogHelper.changeDialogState(domElement, 'closed');
    };

    domElement.open   = function(){
        cuiDialogHelper.changeDialogState(domElement, 'open');
    };

    domElement.toggle = function(){
        var newState = this.state === 'closed' ? 'open' : 'closed';
        cuiDialogHelper.changeDialogState(this, newState);
    };

    domElement.updateContent = function(content){
        domElement.querySelector('.cui-dialog--content').innerHTML = content;
    };

    domElement.getContent = function(){
        return domElement.querySelector('.cui-dialog--content').innerHTML;
    };

    document.addEventListener('keypress', function(event){
        if (domElement.state == 'closed') {
            return;
        }

        if (parseInt(event.keyCode, 10) == 27) {
            domElement.close();
        }
    });


    // Add required domElements and move the innerHTML to a new 'main' domElement
    var content = domElement.innerHTML;

    var background = document.createElement('figure');
        background.className = 'cui-dialog--container';
        background.onclick = domElement.close;

    var dialog = document.createElement('section');
        dialog.className = 'cui-dialog';

    var close = document.createElement('i');
        close.className = 'cui-dialog--close';
        close.onclick = domElement.close;

    var main = document.createElement('main');
        main.className = 'cui-dialog--content';
        main.innerHTML = content;

    dialog.appendChild(close);
    dialog.appendChild(main);


    domElement.innerHTML = '';
    domElement.appendChild(background);
    domElement.appendChild(dialog);

    domElement.initialized = true;

    return domElement;
}

cuiDialogHelper.initializeAll = function() {
    var dialogs = document.querySelectorAll('cui-dialog');
    if (dialogs.length > 0) {
        for (var i = 0; i < dialogs.length; i++) {
            cuiDialogHelper.initialize(dialogs[i]);
        }
    }
}

// Helper function for listening for new `cui-dialog` domElements

cuiDialogHelper.nodeInserted = function(event){
    if (event.animationName == 'cuiDialogNodeInserted' && !event.target.initialized) {
        cuiDialogHelper.initialize(event.target);
    }
}

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
// Helper function for setting up the required changes to the `cui-dialog` domElement
cuiDialogHelper.changeDialogState = function(domElement, state) {
    // Get current state as fallback
    var state = state || domElement.state;

    // Create event
    var event = new CustomEvent('changeDialogState',
        {
            detail: {dialog:domElement},
            bubbles: true,
            cancelable: true
        }
    )

    // Update the state
    domElement.state = state;

    // And update the corresponding classes
    if (state == 'open' && domElement.className.indexOf('__isOpen') == -1) {
        domElement.className += ' __isOpen';
    }

    if (state == 'closed' && domElement.className.indexOf('__isOpen') !== -1) {
        domElement.className = domElement.className.replace('__isOpen', '');
    }

    // Sent the `changeDialogState` event
    document.dispatchEvent(event);
}
document.addEventListener('animationstart', cuiDialogHelper.nodeInserted, false);
document.addEventListener('MSAnimationStart', cuiDialogHelper.nodeInserted, false);
document.addEventListener('webkitAnimationStart', cuiDialogHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", cuiDialogHelper.initializeAll, false);

/***
*
* MDN Suggested polyfill for CustomEvent
*
* https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
*
* ***/
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();