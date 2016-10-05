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