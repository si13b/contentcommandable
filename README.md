# Contentcommandable

> contenteditable(event) => command

_What is this?_

Contentcommandable is a function that converts DOM events on a contenteditable element into commands that can then be fed into
a state management tool such as Redux, Flux, etc. It also prevents standard mutation behaviour on the element, but will
allow normal selection behaviour to continue (that's not the problematic part of contenteditable).

_Why?_

This is useful if you're looking to create a rich text editor, a code editor, or any other kind of control that accepts keyboard
input from the user. Because it converts events into commands, you have full control over the behaviour and can ensure that
it's reliable across all browsers.

For example, you could convert these commands into Redux actions, and then use that to update text editor content state. You could
then use a view layer like React or VueJS to convert that content state into DOM changes visible to the user.

Because this is not a full blown text editor, there are many other use cases that can be realised.

Inspiration: DraftJS, ProseMirror, CKEditor 5, the article below [1], pretty much every new rich text editor in the last few years.

[1] https://medium.com/content-uneditable/contenteditable-the-good-the-bad-and-the-ugly-261a38555e9c

# TODO

_Is it production ready?_

No, not yet. It needs;

* Thorough testing;
	* Cross-browser (iOS, Android, Safari, IE11, Edge, FF, Chrome) 
	* Internationalisation and alternative keyboards
	* Documented test cases
	* Automation (using webdriver)
* Selection changes should also be sent through as commands

# Installation

	npm install contentcommandable --save

OR, just copy-paste the contentcommandable.js script, it should work in old ES5 browsers.

# Usage

	contentCommandable(element, handler);
	
* **`element`**
<br>DOM contenteditable element to attach to. 
* **`handler(command: string, arg: any)`**
<br>Function that will accept a command and optional argument. See the command reference below for more details.


### Full example

Below is an example of attaching to a DOM element, and logging any commands:

	import contentCommandable from 'contentcommandable';
	 
	// ...
	 
	const handler = (cmd, arg) => console.log(`${cmd} ${arg}`);
	const myEditorEl = document.querySelector('#myeditor');
	contentCommandable(myEditorEl, handler);


# Command reference

List of possible commands:

* **`ENTER`**
<br>The user has pressed the enter key
* **`DELETE`**
<br>The user has pressed the delete key
* **`BACKSPACE`**
<br>The user has pressed the backspace key
* **`TAB`**
<br>The user has pressed the tab key
* **`TEXT`**
<br>The user has pressed a key that would usually result in text being added
	* `arg`
	<br>The argument will be the equivalent character for the key pressed
* **`PASTE`**
<br>The user is attempting to paste content
* **`DROP`**
<br>The user is attempting to drag/drop content in

# About

Created by Simon Bracegirdle

Distributed under the MIT license. See LICENSE for more information.

https://github.com/si13b/contentcommandable
