document.addEventListener("DOMContentLoaded", function(event) {
    // This will
    cuiDialog.dom = document.querySelector('cui-dialog');
    //cuiDialog.changeDialogState();
});


var cuiDialog = {
    open: function(name) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        console.log(name, dialogDom);
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.open();
        }
    },
    changeDialogState: function(domElement, state) {
        if (typeof state == 'undefined') {
            var state = domElement.state;
        }

        var event = new CustomEvent('changeDialogState',
        	{
                detail: {state:state},
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
        console.log( state, domElement.className);

        // Update the body class, I think I will remove this in the future.
        // Since people can add this functionality themselve by simply adding
        // an event listener on 'changeDialogState'
        cuiDialog.toggleBodyClass(domElement);

        // Sent the `changeDialogState` event
        document.dispatchEvent(event);
    },

    toggleBodyClass: function(domElement){
        var body = document.querySelector('body');
        if (domElement.state == 'open' && body.className.indexOf('activeDialog') == -1) {
            body.className += ' activeDialog';
        }
        if (domElement.state == 'closed' && body.className.indexOf('activeDialog') !== -1) {
            body.className = body.className.replace('activeDialog', '');
        }
    },


    initialize: function(domElement) {
        // Add state functionality
        domElement.state  = 'closed';
        domElement.close  = function(){
            cuiDialog.changeDialogState(domElement, 'closed');
        };
        domElement.open   = function(){
            cuiDialog.changeDialogState(domElement, 'open');
        };
        domElement.toggle = function(){
            var newState = this.state === 'closed' ? 'open' : 'closed';
            cuiDialog.changeDialogState(this, newState);
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


        console.log(domElement);
        console.log(domElement.toggle());

        return domElement;
    },
    nodeInserted: function(event){
        if (event.animationName == 'cuiDialogNodeInserted') {
            cuiDialog.initialize(event.target);
        }
    }
}

document.addEventListener('animationstart', cuiDialog.nodeInserted, false);
document.addEventListener('MSAnimationStart', cuiDialog.nodeInserted, false);
document.addEventListener('webkitAnimationStart', cuiDialog.nodeInserted, false);




