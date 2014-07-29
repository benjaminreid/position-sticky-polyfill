;(function() {

  // helpers
  var __bind = function(fn, me) { return function() { return fn.apply(me, arguments); } };

  // classes
  var StickyElement,
      StickyController;

  // the function to expose to the window for people to call
  var PositionSticky;

  StickyController = (function() {
    function StickyController(stickyElements) {
      this.update = __bind(this.update, this);

      // an array of all the sticky elements
      this.stickyElements = stickyElements;

      this.init();
      return this;
    }

    StickyController.prototype.init = function() {
      this.setup();
      this.events();
    };

    StickyController.prototype.setup = function() {
      for(var i = 0; i < this.stickyElements.length; i++) {
        var stickyElement = this.stickyElements[i];
        var nextStickyElement = this.stickyElements[i+1];
        stickyElement.setZindex(i);

        if (nextStickyElement) {
          if ( (stickyElement.position + stickyElement.element.offsetHeight) >= nextStickyElement.position ) {
            stickyElement.disable();
          }
        }
      }
    };

    StickyController.prototype.events = function() {
      window.addEventListener('scroll', this.update);
    };

    StickyController.prototype.update = function(e) {
      var scrollTop = this.getScrollTop();

      for(var i = 0; i < this.stickyElements.length; i++) {
        var stickyElement = this.stickyElements[i];
        stickyElement.update();

        // when the sticky element reaches the top
        if ( ((stickyElement.stuck === false) && (scrollTop >= stickyElement.position)) && (scrollTop <= stickyElement.limit) ) {
          stickyElement.stick();
        } else if ( (stickyElement.frozen !== true) && (scrollTop >= stickyElement.limit ) ) {
          stickyElement.freeze();
        } else if ( (stickyElement.frozen === true) && (scrollTop <= stickyElement.limit ) ) {
          stickyElement.stick();
        } else if ( (stickyElement.stuck === true) && (scrollTop <= stickyElement.position) ) {
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
      // where the sticking should stop
      this.limit = null;
      // sticky state
      this.stuck = false;
      // frozen state
      this.frozen = false;

      this.zIndex = 0;

      this.enabled = true;

      this.init();
      return this;
    }

    StickyElement.prototype.init = function() {
      this.createDummyElement()
      this.insertDummyElement();
      this.getOffset();
      this.getLimit();
    };

    StickyElement.prototype.update = function() {
      this.getLimit();

      // update the frozen position
      if (this.frozen === true) {
        this.freeze();
      }
    };

    StickyElement.prototype.createDummyElement = function() {
      var dummyElement;
      // create a new element
      dummyElement = document.createElement('div');

      this.height = this.element.offsetHeight;

      // set the width the height off the original element
      dummyElement.style.height = "0px";

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

    StickyElement.prototype.getLimit = function() {
      // returns the limit for which the element should stop sticking
      return this.limit = (this.element.parentNode.offsetTop + this.element.parentNode.offsetHeight) - this.element.offsetHeight;
    };

    StickyElement.prototype.setZindex = function(index) {
      this.element.style.position = "relative";
      this.zIndex = index;
      return this.element.style.zIndex = index;
    };

    StickyElement.prototype.hideDummyElement = function() {
      return this.dummyElement.style.height = "0px";
    };

    StickyElement.prototype.showDummyElement = function() {
      return this.dummyElement.style.height = this.height + "px";
    };

    StickyElement.prototype.stick = function() {
      if (this.enabled === false) { return false; }

      this.stuck = true;
      this.frozen = false;

      this.showDummyElement();

      this.element.style.position = "fixed";
      this.element.style.top = "0";
      this.element.style.width = this.dummyElement.offsetWidth + "px";
    };

    StickyElement.prototype.unstick = function() {
      if (this.enabled === false) { return false; }

      this.stuck = false;
      this.frozen = false;

      this.hideDummyElement();
      this.element.style.position = "relative";
    };

    StickyElement.prototype.freeze = function() {
      if (this.enabled === false) { return false; }

      this.showDummyElement();

      this.frozen = true;
      this.element.style.position = "absolute";
      this.element.style.top = this.limit + "px";
      this.element.style.width = this.dummyElement.offsetWidth + "px";
    };

    StickyElement.prototype.disable = function() {
      this.unstick();
      this.enabled = false;
    };

    return StickyElement;
  })();


  // exposed function to call the code
  PositionSticky = function(elements) {
    var stickyElements = [];

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var stickyElement = new StickyElement(element);
      stickyElements.push(stickyElement);
    }

    new StickyController(stickyElements);
  };

  window.PositionSticky = PositionSticky;

})();
