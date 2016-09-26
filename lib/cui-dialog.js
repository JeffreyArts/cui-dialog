// cui Dialog API
var cuiDialog = {
    // Opens a targeted dialog;
    open: function(name) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.open();
        }
    },

    // Closes a targeted dialog;
    close: function(name) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.close();
        }
    },

    // Toggle the state of a targeted dialog;
    toggle: function(name) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.toggle();
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


    // Add required domElements and move the innerHTML to a new 'main' domElement
    var content = domElement.innerHTML;

    var background = document.createElement('figure');
        background.className = 'cui-dialog--container __isBackground';
        background.onclick = domElement.close;

    var container = document.createElement('div');
        container.className = 'cui-dialog--container';

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
