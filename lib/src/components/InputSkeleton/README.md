# InputLikeElement

What is the point of this? A few types of elements will generally be used in Forms (imagine a file input) which are going to expose their real interface in a Modal. In this case, they need some entrypoint on the DOM, so InputLikeElement is a class of elements looking like you see here, with a configurable Button to open the modal, and otherwise properties like an Input or Dropdown have.

## Targeted support

Expected usage:
* FileInput
* TreeBrowser
