;(function() {

  var StickyElement;

  StickyElement = (function() {
    function StickyElement(element) {
      // the element that wants to be made position: sticky
      this.element = element;
      this.dummyElement = null;
      this.init();
      return this;
    }

    StickyElement.prototype.init = function() {
      this.createDummyElement()
      this.insertDummyElement();
    };

    StickyElement.prototype.createDummyElement = function() {
      var dummyElement;
      // create a new element
      dummyElement = document.createElement('div');

      // set the width the height off the original element
      dummyElement.style.height = this.element.offsetHeight + "px";

      // @dev
      dummyElement.style.background = "red";

      return this.dummyElement = dummyElement;
    };

    StickyElement.prototype.insertDummyElement = function() {
      // insert the dummy element after the original element
      return this.element.parentNode.insertBefore(this.dummyElement, this.element.nextSibling);
    };

    return StickyElement;
  })();

  // testing code
  var el = document.getElementById('first');
  var s = new StickyElement(el);
  console.log(s);

})();
