;(function() {

  var StickyElement;

  StickyElement = (function() {
    function StickyElement(element) {
      // the element that wants to be made position: sticky
      this.element = element;
      // reference for the dummy element
      this.dummyElement = null;
      // how far the element is down the view
      this.position = null;
      this.init();
      return this;
    }

    StickyElement.prototype.init = function() {
      this.createDummyElement()
      this.insertDummyElement();
      this.getOffset();
    };

    StickyElement.prototype.createDummyElement = function() {
      var dummyElement;
      // create a new element
      dummyElement = document.createElement('div');

      // set the width the height off the original element
      dummyElement.style.height = this.element.offsetHeight + "px";

      // hide the element initially
      dummyElement.style.display = "none";

      return this.dummyElement = dummyElement;
    };

    StickyElement.prototype.insertDummyElement = function() {
      // insert the dummy element after the original element
      return this.element.parentNode.insertBefore(this.dummyElement, this.element.nextSibling);
    };

    StickyElement.prototype.getOffset = function() {
      return this.position = this.element.offsetTop;
    };

    return StickyElement;
  })();

  // testing code
  var el = document.getElementById('first');
  var s = new StickyElement(el);
  console.log(s);

})();
