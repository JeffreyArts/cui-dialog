document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    cuiDialog.dom = document.querySelector('cui-dialog');
    cuiDialog.closeIcon = cuiDialog.dom.querySelector('cui-dialog--close');
    cuiDialog.changeDialogState();
});

document.addEventListener("changeDialogState", function(event) {
    var dom = document.querySelector('cui-dialog');
    var state = event.detail.state;

    if (state == 'open' && dom.className.indexOf('__isOpen') == -1) {
        dom.className += ' __isOpen';
    }

    if (state == 'closed' && dom.className.indexOf('__isOpen') !== -1) {
        dom.className = dom.className.replace('__isOpen', '');

    }
})

var cuiDialog = {
    state: 'closed',
    changeDialogState: function(state) {
        if (typeof state == 'undefined') {
            state = cuiDialog.state;
        }

        var event = new CustomEvent('changeDialogState',
        	{
                detail: {state:state},
        		bubbles: true,
        		cancelable: true
        	}
        )

        cuiDialog.state = state;

        cuiDialog.toggleBodyClass();
        document.dispatchEvent(event);
    },
    toggle: function(){
        cuiDialog.changeDialogState(cuiDialog.state === 'closed' ? 'open' : 'closed');
    },
    open: function(){
        cuiDialog.changeDialogState('open');
    },
    close: function(){
        cuiDialog.changeDialogState('closed');
    },
    toggleBodyClass: function(){
        var body = document.querySelector('body');
        if (cuiDialog.state == 'open' && body.className.indexOf('activeDialog') == -1) {
            body.className += ' activeDialog';
        }
        if (cuiDialog.state == 'closed' && body.className.indexOf('activeDialog') !== -1) {
            body.className = body.className.replace('activeDialog', '');
        }
    },
    initialize: function(domElement){
        var content = domElement.innerHTML;

        var background = document.createElement('figure');
            background.className = 'cui-dialog--container __isBackground';
            background.onclick = cuiDialog.close;

        var container = document.createElement('div');
            container.className = 'cui-dialog--container';

        var dialog = document.createElement('section');
            dialog.className = 'cui-dialog';

        var close = document.createElement('i');
            close.className = 'cui-dialog--close';
            close.onclick = cuiDialog.close;

        var main = document.createElement('main');
            main.className = 'cui-dialog--content';
            main.innerHTML = content;

        dialog.appendChild(close);
        dialog.appendChild(main);


        domElement.innerHTML = '';
        domElement.appendChild(background);
        domElement.appendChild(dialog);

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




