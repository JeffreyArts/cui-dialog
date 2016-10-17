# Clean UI Dialog #
This code allows you to add a dialog to your project. The dialog can be added with the `cui-dialog` html tag. And should have a `name` attribute in order to target the element to open/close it.


## Basic usage
Include the following files to your project (as high as possible):
- /lib/cui-dialog-full.min.js

And use a dialog by adding the cui-dialog as followed:

### HTML
```
<cui-dialog name="xxx"></cui-dialog>
```

### Javascript
With `cuiDialog` API:
```
cuiDialog.open('xxx');
```

Or just by calling the open function on the domElement itself:
```
document.querySelector('cui-dialog[name=xxx]').open();
```


## Features
The cui-dialog has several features which makes it a nice dialog for your projects. It is easy to use, simple to style/theme and is fully build in native Javascript (Ecmascript 5) without depencies.
The features are divided in the following categories:

- API
- Direct Dom
- Events



# API
If you want to use a centralized way to interaction with the cui-dialog you can use the global `cuiDialog` object. This global object has several functions which can be called by providing the `name` parameter. This means it will target the cui-dialog whith the corresponding name attribute.

#### Open
```
cuiDialog(name).open()
```
*Adds an `.__isOpen` class to the `cui-dialog` domElement, which will display the dialog as open.*

#### Close
```
cuiDialog(name).close()
```
*Removes the `.__isOpen` class from the `cui-dialog` domElement, which will hide the dialog.*

#### Toggle
```
cuiDialog(name).toggle()
```
*Toggles the `.__isOpen` class on the `cui-dialog` domElement, which will hide/show the dialog.*


#### Update content
```
cuiDialog(name).toggle(value)
```
*Updates the content of the dialog.*


#### Get content
```
cuiDialog(name).getContent()
```
*Returns the content of the dialog.*




# Direct Dom
If you prefer to use domElements directly instead of the global API you can use the same function as described as above. In the following pseudocode
we assume that `domElement` is a domElement which you have gather by using something like `document.querySelector('cui-dialog')`.

#### Open
```
domElement.open()
```
*Adds an `.__isOpen` class to the `cui-dialog` domElement, which will display the dialog as open.*


#### Close
```
domElement.close()
```
*Removes the `.__isOpen` class from the `cui-dialog` domElement, which will hide the dialog.*


#### Toggle
```
domElement.toggle()
```
*Toggles the `.__isOpen` class on the `cui-dialog` domElement, which will hide/show the dialog.*


#### Update content
```
domElement.updateContent(value)
```
*Updates the content of the dialog.*


#### Get content
```
domElement.getContent()
```
*Returns the content of the dialog.*


#### State (private)
```
domElement.state
```
A string which hold the value of the state the dialog is currently in

#### Initialized (private)
```
domElement.initialized
```
A boolean which is set to prevent a dialog from being initialized multiple times. This can occur when it takes more time to fully load the
document than it takes for the css animation to trigger the `cuiDialogNodeInserted` function.


# Events
At the moment there is only 1 event and it is triggered on any state change.

#### Change dialog state
```
document.addEventListener("changeDialogState", function(event) {
    console.log(event.detail.dialog);
});
```
**event.detail.dialog** This value refers to the domElement of the cui-dialog which state has changed