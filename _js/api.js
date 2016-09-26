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
    },

    // Update the content of the dialog with `value`
    updateContent: function(name, value) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.updateContent(value);
        }
    }

    // Get the content of the targeted dialog
    getContent: function(name) {
        var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
        if (dialogDom === null) {
            throw 'No cui-dialog found with name `' + name + '`';
        } else {
            dialogDom.getContent();
        }
    }
}