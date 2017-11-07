var contentCommandable = (function() {
	var contentCommandable = function (el, dispatch) {
		el.onkeypress = nope;
		el.onkeyup = nope;
		el.oncut = function (evt) {
			nope(evt);
			dispatch(COMMANDS.CUT);
		};
		el.onpaste = function (evt) {
			nope(evt);
			dispatch(COMMANDS.PASTE);
		};
		el.ondrag = nope;
		el.ondrop = function (evt) {
			nope(evt);
			dispatch(COMMANDS.DROP);
		};

		// TODO implement addressing and selection commands so users can track it
		// TODO selectionchange

		el.onkeydown = function(evt) {
			// Allow non-mutative events to pass through, thanks.
			if (NON_MUTATIVE[evt.key]) {
				return;
			}

			// Special case, allow paste event to capture
			// TODO Platform dependent, may be mutative on macOS etc
			if (evt.ctrlKey) {
				return;
			}

			nope(evt); // Everything that follows is mutative, prevent default behaviour

			if (evt.key === 'Enter') {
				dispatch(COMMANDS.ENTER);
			} else if (evt.key === 'Del') {
				dispatch(COMMANDS.DELETE);
			} else if (evt.key === 'Backspace') {
				dispatch(COMMANDS.BACKSPACE);
			} else if (evt.key === 'Tab') {
				dispatch(COMMANDS.TAB);
			} else if (evt.key === 'Spacebar') {
				dispatch(COMMANDS.TEXT, ' ');
			} else {
				dispatch(COMMANDS.TEXT, evt.key);
			}
		};
	};

	var nope = function (el) {
		el.preventDefault();
	};

	var COMMANDS = {
		ENTER: 'ENTER',
		DELETE: 'DELETE',
		BACKSPACE: 'BACKSPACE',
		TEXT: 'TEXT',
		PASTE: 'PASTE',
		CUT: 'CUT',
		DROP: 'DROP',
		TAB: 'TAB'
	};

	/**
	 * Map of non-mutative key events where it's safe to allow native behaviour.
	 *
	 * Handy reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
	 */
	var NON_MUTATIVE = {
		ArrowLeft: 1,
		ArrowRight: 1,
		ArrowDown: 1,
		ArrowUp: 1,
		Up: 1,
		Down: 1,
		Left: 1,
		Right: 1,
		Help: 1,
		ContextMenu: 1,
		Home: 1,
		End: 1,
		Control: 1,
		PageUp: 1,
		PageDown: 1,
		F1: 1,
		F2: 1,
		F3: 1,
		F4: 1,
		F5: 1,
		F6: 1,
		F7: 1,
		F8: 1,
		F9: 1,
		F10: 1,
		F11: 1,
		F12: 1,
		F13: 1,
		F14: 1,
		F15: 1,
		F16: 1,
		F17: 1,
		F18: 1,
		F19: 1,
		F20: 1,
		F21: 1,
		F22: 1,
		F23: 1,
		F24: 1,
		Escape: 1,
		Shift: 1,
		Meta: 1,
		NumLock: 1,
		Insert: 1,
		Clear: 1,
		Alt: 1,
		CapsLock: 1,
		Win: 1,
		Esc: 1,
		ScrollLock: 1,
		PrintScreen: 1,
		Pause: 1
	};

	return contentCommandable;
}());

module.exports = contentCommandable;