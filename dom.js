/**
 * @license
 * DOM shortcut library
 *  version 0.0.1c
 *  copyright (c) 2012-2015, Nicolas JOYARD <joyard dot nicolas at gmail dot com>
 *  license: MIT
 */

/*jshint browser:true */
/*global define, require */

define([], function () {
	'use strict';

	var dom = {},
		addListener, remListener,
		querySelector, querySelectorAll;


	/**
	 * Execute a callback when DOM is ready
	 * Requires a 'domReady' plugin to be available
	 * Usage: dom.ready(<callback>)
	 */
	dom.ready = function(callback) {
		require(['domReady!'], callback);
	};


	querySelectorAll = function(e, s) {
		return [].slice.call(e.querySelectorAll(s));
	};

	querySelector = function(e, s) {
		return e.querySelector(s);
	};


	/**
	 * querySelector[All] aliases
	 */
	dom.$ = dom.get = function(element, selector) {
		if (typeof element === 'string') {
			selector = element;
			element = document;
		}

		if (!element) {
			throw new Error('No element specified');
		}

		return querySelector(element, selector);
	};

	dom.$$ = dom.all = function(element, selector) {
		if (typeof element === 'string') {
			selector = element;
			element = document;
		}

		if (!element) {
			throw new Error('No element specified');
		}

		return querySelectorAll(element, selector);
	};

	dom.$C = dom.children = function(element, selector) {
		return dom.all(element, selector).filter(function(elem) {
			return elem.parentNode === element;
		});
	};


	/**
	 * getElementById alias
	 */
	if (document.getElementById) {
		dom.gbid = function (id) {
			return document.getElementById(id);
		};
	} else if (document.all) {
		dom.gbid = function (id) {
			return document.all[id];
		};
	} else if (document.layers) {
		dom.gbid = function (id) {
			return document.layers[id];
		};
	} else {
		throw new Error('No getElementById alternative');
	}


	/**
	 * document.body alias
	 */
	dom.body = function () { return document.body; };


	/**
	 * document.createElement alias
	 */
	dom.elem = function(tag, doc) { return (doc || document).createElement(tag); };
	dom.text = function(text, doc) { return (doc || document).createTextNode(text); };
	dom.frag = function(nodes, doc) {
		var frag = (doc || document).createDocumentFragment();
		[].slice.call(nodes || []).forEach(function(n) {
			frag.appendChild(n);
		});
		return frag;
	};


	/**
	 * Empty an element (el can either be an element or a selector)
	 */
	dom.empty = function(el) {
		if (typeof el === 'string') {
			dom.all(el).forEach(dom.empty);
		} else {
			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}
		}
	};


	/**
	 * Remove an element from the DOM tree
	 */
	dom.remove = function(el) {
		if (typeof el === 'string') {
			dom.all(el).forEach(dom.remove);
		} else {
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
	};


	/* Remove comment nodes and empty or whitespace-only text nodes */
	dom.clean = function(node) {
		[].slice.call(node.childNodes).forEach(function(child) {
			if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
				node.removeChild(child);
			} else if (child.nodeType === 1) {
				dom.clean(child);
			}
		});

		return node;
	};


	/**
	 * Set style elements in 'style' on 'el' (element or selector)
	 */
	dom.style = function (el, style) {
		var p;

		if (typeof el === 'string') {
			dom.all(el).forEach(function(elem) {
				dom.style(elem, style);
			});
		} else {
			if (!el) {
				throw new Error('No element specified');
			}

			for (p in style) {
				if (style.hasOwnProperty(p)) {
					el.style[p] = style[p];
				}
			}
		}
	};



	// Cross browser event handling
	if (document.addEventListener) {
		addListener = function (el, evt, handler) {
			el.addEventListener(evt, handler, true);
		};

		remListener = function (el, evt, handler) {
			el.removeEventListener(evt, handler, true);
		};
	} else if (document.attachEvent) {
		addListener = function (el, evt, handler) {
			el.attachEvent('on' + evt, handler);
		};

		remListener = function (el, evt, handler) {
			el.detachEvent('on' + evt, handler);
		};
	} else {
		throw new Error('No addEventListener alternative');
	}


	/**
	 * Set handler 'handler' for event 'evt' on element (or selector) 'el'.
	 * 'handler' will receive the Event object as a parameter and 'el' as context.
	 */
	dom.addListener = function (el, evt, handler) {
		if (typeof el === 'string') {
			el = dom.get(el);
		}

		if (!el) {
			throw new Error('No element specified');
		}

		addListener(el, evt, handler);
	};

	dom.remListener = function(el, evt, handler) {
		if (typeof el === 'string') {
			el = dom.get(el);
		}

		if (!el) {
			throw new Error('No element specified');
		}

		remListener(el, evt, handler);
	};


	/**
	 * Get first parent element of 'element' matching 'selector'
	 * When 'includeMe' is true, returns 'element' if it matches.
	 */
	dom.$P = dom.parent = function(element, selector, includeMe) {
		var node = element;

		if (!includeMe) {
			node = node.parentNode;
		}

		while (node && node.parentNode) {
			if (dom.all(node.parentNode, selector).indexOf(node) !== -1) {
				return node;
			}

			node = node.parentNode;
		}

		return null;
	};


	return dom;
});
