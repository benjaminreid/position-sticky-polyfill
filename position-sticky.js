;(function() {

  // helpers
  var __bind = function(fn, me) { return function() { return fn.apply(me, arguments); } };

  // classes
  var StickyElement,
      StickyController;

  StickyController = (function() {
    function StickyController(stickyElements) {
      this.update = __bind(this.update, this);

      // an array of all the sticky elements
      this.stickyElements = stickyElements;

      this.init();
      return this;
    }

    StickyController.prototype.init = function() {
      this.events();
    };

    StickyController.prototype.events = function() {
      window.addEventListener('scroll', this.update);
    };

    StickyController.prototype.update = function(e) {
      var scrollTop = this.getScrollTop();

      for(var i = 0; i < this.stickyElements.length; i++) {
        var stickyElement = this.stickyElements[i];

        // when the sticky element reaches the top
        if (scrollTop >= stickyElement.position) {
          stickyElement.stick();
        } else if ( (stickyElement.stuck === true) && (scrollTop <= stickyElement.position ) ) {
          stickyElement.unstick();
        }
      }
    };

    StickyController.prototype.getScrollTop = function() {
      return document.body.scrollTop;
    };

    return StickyController;
  })();



  StickyElement = (function() {
    function StickyElement(element) {
      // the element that wants to be made position: sticky
      this.element = element;
      // reference for the dummy element
      this.dummyElement = null;
      // how far the element is down the view
      this.position = null;
      // sticky state
      this.stuck = false;

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

      // @DEV
      dummyElement.style.background = "red";

      return this.dummyElement = dummyElement;
    };

    StickyElement.prototype.insertDummyElement = function() {
      // insert the dummy element after the original element
      return this.element.parentNode.insertBefore(this.dummyElement, this.element.nextSibling);
    };

    StickyElement.prototype.getOffset = function() {
      // return the original elements offset from the top of the page
      return this.position = this.element.offsetTop;
    };

    StickyElement.prototype.hideDummyElement = function() {
      return this.dummyElement.style.display = "none";
    };

    StickyElement.prototype.showDummyElement = function() {
      return this.dummyElement.style.display = "block";
    };

    StickyElement.prototype.stick = function() {
      this.stuck = true;

      this.showDummyElement();

      this.element.style.position = "fixed";
      this.element.style.top = "0";
      this.element.style.width = this.dummyElement.offsetWidth + "px";
    };

    StickyElement.prototype.unstick = function() {
      this.stuck = false;

      this.hideDummyElement();
      this.element.style.position = "static";
    };

    return StickyElement;
  })();



  // testing code
  var el = document.getElementById('first');
  var s = new StickyElement(el);

  var sc = new StickyController([s]);

})();
