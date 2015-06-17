# DOM Shortcut library

This is a partially cross-browser shortcut library for DOM operations.  Its main goal is not to be compatible with all browsers, but to simplify common operations.

## Element selection

### `dom.get([element, ] selector)`: select one element

*Alias:* `dom.$`.

Returns the first element inside `element` that matches `selector`.  If `element` is not specified, `document` is used instead.  This is a shortcut to `(element||document).querySelector(selector)`.

### `dom.all([element, ] selector)`: select multiple elements

*Alias:* `dom.$$`.

Returns an array of elements inside `element` that match `selector`.  If `element` is not specified, `document` is used instead.  This is a shortcut to `[].slice.call((element||document).querySelectorAll(selector))`.

### `dom.gbid(id)`: select by ID

Returns the first element in the document with ID `id`.  Compatible with older browsers.

### `dom.children(element, selector)`: select direct children

*Alias:* `dom.$C`.

Returns an array of direct children from `element` that match `selector`.

### `dom.parent(element, selector[, includeMe=false])`: select closest parent

*Alias:* `dom.$P`.

Returns the closest parent node from `element` that matches `ßelector`.  When `includeMe` is true and `element` itself matches `selector`, it is returned instead.

### `dom.body()`: get document body

Returns the `body` element.  Shortcut to `document.body`.  This is effectively useless but I keep it for compatibility reasons.

## Node creation

### `dom.elem(tag[, doc])`: create element

Creates an element owned by `doc` with tag `tag`.  If `doc` is not specified, `document` is used instead.

### `dom.text(text[, doc])`: create text node

Creates a text node owned by `doc` with content `text`.  If `doc` is not specified, `document` is used instead.

### `dom.frag(nodes[, doc])`: create document fragment

Creates a DocumentFragment owned by `doc` with children `nodes`.  If `doc` is not specified, `document` is used instead.  `nodes` may be an array of nodes, a NodeList or a falsy value to create an empty fragment.

## Node manipulation

### `dom.empty(elem)`: empty element

Empties (removes all children) from element `elem`.  If `elem` is a string, it is treated as a selector and all matching elements are emptied.

### `dom.remove(elem)`: remove element

Removes element `elem` from its parent, if any.  If `elem` is a string, it is treated as a selector and all matching elements are removed from their parent.

### `dom.clean(elem)`: cleanup element tree

Removes all comments and empty (or whitespace-only) text nodes from the tree below `elem`.  If `elem` is a string, it is treated as a selector and all matching elements are cleaned up.

## Node attributes

### `dom.style(element, style)`: set style attributes

Sets multiple style attributes at once on `element`.  `style` must be an object which keys are style property names.  If `element` is a string, it is treated as a selector and style is applied to all matching elements.

```js
dom.style('a.menu', {
  textDecoration: 'none',
  color: '#af6',
  padding: '37px'
});
```

## Event handlers

### `dom.addListener(elem, event, handler)`: set event handler

Adds `handler` as an event handler for `event` on `elem`.  If `elem` is a string, it is treated as a selector and the first matching element is used.

This is partly cross-browser but the handler still has to check both its argument and `window.event`.

```js
dom.addListener(elem, 'click', function(e) {
    e = e || window.event;
    // etc.
});
```

### `dom.remListener(elem, event, handler)`: unset event handler

Remove `handler` from the event handlers for `event` on `elem`.  If `elem` is a string, it is treated as a selector and the first matching element is used.
