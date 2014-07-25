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
      this.setup();
      this.events();
    };

    StickyController.prototype.setup = function() {
      for(var i = 0; i < this.stickyElements.length; i++) {
        var stickyElement = this.stickyElements[i];
        stickyElement.setZindex(i);
      }
    };

    StickyController.prototype.events = function() {
      window.addEventListener('scroll', this.update);
    };

    StickyController.prototype.update = function(e) {
      var scrollTop = this.getScrollTop();

      for(var i = 0; i < this.stickyElements.length; i++) {
        var stickyElement = this.stickyElements[i];

        // when the sticky element reaches the top
        if ( (stickyElement.stuck === false) && (scrollTop >= stickyElement.position) ) {
          stickyElement.stick();
        } else if ( (stickyElement.stuck === true && stickyElement.frozen !== true) && (scrollTop >= stickyElement.limit ) ) {
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

      this.init();
      return this;
    }

    StickyElement.prototype.init = function() {
      this.createDummyElement()
      this.insertDummyElement();
      this.getOffset();
      this.getLimit();
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

    StickyElement.prototype.getLimit = function() {
      // returns the limit for which the element should stop sticking
      return this.limit = (this.element.parentNode.offsetTop + this.element.parentNode.offsetHeight) - this.element.offsetHeight;
    };

    StickyElement.prototype.setZindex = function(index) {
      this.element.style.position = "relative";
      return this.element.style.zIndex = index;
    };

    StickyElement.prototype.hideDummyElement = function() {
      return this.dummyElement.style.display = "none";
    };

    StickyElement.prototype.showDummyElement = function() {
      return this.dummyElement.style.display = "block";
    };

    StickyElement.prototype.stick = function() {
      this.stuck = true;
      this.frozen = false;

      this.showDummyElement();

      this.element.style.position = "fixed";
      this.element.style.top = "0";
      this.element.style.width = this.dummyElement.offsetWidth + "px";
    };

    StickyElement.prototype.unstick = function() {
      this.stuck = false;
      this.frozen = false;

      this.hideDummyElement();
      this.element.style.position = "relative";
    };

    StickyElement.prototype.freeze = function() {
      this.frozen = true;
      this.element.style.position = "absolute";
      this.element.style.top = this.limit + "px";
    };

    return StickyElement;
  })();



  // testing code
  var s1 = new StickyElement(document.getElementById('first'));
  var s2 = new StickyElement(document.getElementById('second'));
  var s3 = new StickyElement(document.getElementById('three'));
  var s4 = new StickyElement(document.getElementById('four'));
  var s5 = new StickyElement(document.getElementById('five'));
  var s6 = new StickyElement(document.getElementById('six'));

  var sc = new StickyController([s1, s2, s3, s4, s5, s6]);

})();
