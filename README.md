# Clean UI Dialog #
cui-dialog


## Basic usage
Include the following files to your project:
- /css/cui-dialog.css
- /lib/cui-dialog.js

And use a dialog by adding the cui-dialog as followed:

### HTML
```
<cui-dialog name="Jeffrey"></cui-dialog>
```

### Javascript
With `cuiDialog` API:
```
cuiDialog.open('Jeffrey');
```

Or just by calling the open function on the domElement itself:
```
document.querySelector('cui-dialog[name=Jeffrey]').open();
```


## Features
The cui-dialog has several features which makes it a nice dialog for your projects. It is easy to use, simple to style/theme and is build in Ecmascript 5 without any depencies.
The features are divided in the following categories:
- API
- Direct Dom
- Events



# API
If you want to use a centralized way to interaction with the cui-dialog's you can use the `cuiDialog` object. This global object has several functions which can be called by providing the `name` parameter. This means it will target the cui-dialog which has the corresponding name attribute

#### open
```
cuiDialog.open(name)
```
**name** the name of the dialog you would like to open.
Adds an `.__isOpen` class to the `cui-dialog` domElement, which will display the dialog as open,

#### close
```
cuiDialog.close(name)
```
**name** the name of the dialog you would like to close.
Removes the `.__isOpen` class from the `cui-dialog` domElement, which will hide the dialog.

#### toggle
```
cuiDialog.toggle(name)
```
**name** the name of the dialog you would like to toggle it's state (open or closed).
Toggles the `.__isOpen` class on the `cui-dialog` domElement, which will hide/show the dialog.





# Direct Dom
If you prefer to use domElements directly instead of the global API you can use the same function as described as above. In the following pseudocode
we assume that `domElement` is a domElement which you have gather by using something like `document.querySelector('cui-dialog')`.

#### open
```
domElement.open()
```
Adds an `.__isOpen` class to the `cui-dialog` domElement, which will display the dialog as open.

#### close
```
cuiDialog.close()
```
Removes the `.__isOpen` class from the `cui-dialog` domElement, which will hide the dialog.


#### toggle
```
cuiDialog.toggle()
```
Toggles the `.__isOpen` class on the `cui-dialog` domElement, which will hide/show the dialog.


#### state (private)
```
cuiDialog.state
```
A string which hold the value of the state the dialog is currently in

#### initialized (private)
```
cuiDialog.initialized
```
A boolean which is set to prevent a dialog from being initialized multiple times. This can occur when it takes more time to fullt load the
document than it takes for the css animation to trigger the `cuiDialogNodeInserted` function.


# Events
At the moment there is only 1 event and it is triggered on any state change.

#### changeDialogState
```
document.addEventListener("changeDialogState", function(event) {
    console.log(event.detail.dialog);
});
```
**event.detail.dialog** This value refers to the domElement of the cui-dialog which state has changed