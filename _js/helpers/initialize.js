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
