function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Universal function to check browser capabilities
function supportsHEVCAlpha() {
  const navigator = window.navigator;
  const ua = navigator.userAgent.toLowerCase();
  const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo);
  const isSafari = ua.includes('safari') && !ua.includes('chrome') && ua.includes('version/');
  return isSafari && hasMediaCapabilities;
}

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelector('.primary-links');
  var secondaryContainer = document.querySelector('.secondary-container');
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('nav');
  var body = document.querySelector('body');

  // Function to open the menu for a specific link
  function openMenu(link) {
    links.querySelectorAll('.secondary-links.visible').forEach(function (otherSecondaryLinks) {
      otherSecondaryLinks.classList.remove('visible');
    });

    if (isMobileDevice()) {
      body.classList.add('no-scroll');
    }

    if (!isMobileDevice()) {
      nav.classList.add('visible');
    }

    var secondaryLinks = link.querySelector('.secondary-links');
    if (secondaryLinks) {
      secondaryLinks.classList.add('visible');
      secondaryContainer.classList.add('visible');
    }
  }

  // Function to close the menu
  function closeMenu() {
    links.querySelectorAll('.secondary-links.visible').forEach(function (otherSecondaryLinks) {
      otherSecondaryLinks.classList.remove('visible');
    });
    secondaryContainer.classList.remove('visible');
    body.classList.remove('no-scroll');
    nav.classList.remove('visible');
  }

  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.close')) {
      closeMenu();
    }
  });

  // Event listener for link clicks using event delegation
  links.addEventListener('click', function (event) {
    var link = event.target.closest('.link');
    var secondaryLinks = link.querySelector('.secondary-links');
    if (link && secondaryLinks) {
      openMenu(link);
    } else {
      closeMenu();
    }
  });

  // Event listener for hamburger click
  hamburger.addEventListener('click', function () {
    nav.classList.toggle('menu-opened');
    links.classList.toggle('menu-opened');
  });

  // Throttle scroll event to improve performance
  function throttle(func) {
    let inThrottle;
    return function () {
      const context = this;
      const args = arguments;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;

        requestAnimationFrame(function () {
          inThrottle = false;
        });
      }
    };
  }

  // Handle scroll with throttle
  function handleScroll() {
    var scrolledClass = 'scrolled';
    if (window.scrollY > 100) {
      nav.classList.add(scrolledClass);
    } else {
      nav.classList.remove(scrolledClass);
    }
    closeMenu();
  }

  // Attach the throttled function to the scroll event
  window.addEventListener('scroll', throttle(handleScroll));


  function adjustFontSize() {
    var wordContainer = document.querySelector('.title');
    if (wordContainer) {
      var word = wordContainer.textContent.trim();
      var viewportWidth = window.innerWidth;
      var desiredWidth = 0.75 * viewportWidth;

      var fontSize = (desiredWidth / word.length) * 1.5;

      wordContainer.style.fontSize = fontSize + 'px';
    }
  }

  adjustFontSize();
  window.addEventListener('resize', adjustFontSize);
});


// Additional document ready functions...

// Universal slider with arrow functionality
var instances = document.querySelectorAll(".slider");

instances.forEach(function (instance) {
  var arrows = instance.querySelectorAll(".arrow"),
    prevArrow = instance.querySelector('.arrow-prev'),
    nextArrow = instance.querySelector('.arrow-next'),
    box = instance.querySelector(".slider-inner"),
    x = 0,
    mx = 0,
    maxScrollWidth = box.scrollWidth - (box.clientWidth / 2) - (box.offsetWidth / 2);

  arrows.forEach(function (arrow) {
    arrow.addEventListener('click', function () {
      if (this.classList.contains("arrow-next")) {
        x = ((box.offsetWidth / 1.5)) + box.scrollLeft - 10;
        box.scrollTo({
          left: x,
          behavior: 'smooth'
        });
        console.log('next');
      } else {
        x = ((box.offsetWidth / 1.5)) - box.scrollLeft - 10;
        box.scrollTo({
          left: -x,
          behavior: 'smooth'
        });
        console.log('prev');
      }
    });
  });

  box.addEventListener('mousemove', function (e) {
    var mx2 = e.pageX - this.offsetLeft;
    if (mx) this.scrollLeft = this.sx + mx - mx2;
  });

  box.addEventListener('mousedown', function (e) {
    this.sx = this.scrollLeft;
    mx = e.pageX - this.offsetLeft;
  });

  box.addEventListener('scroll', function () {
    toggleArrows();
  });

  document.addEventListener("mouseup", function () {
    mx = 0;
  });

  function toggleArrows() {
    if (box.scrollLeft > maxScrollWidth - 10) {
      // disable next button when right end has reached 
      nextArrow.classList.add('disabled');
    } else if (box.scrollLeft < 10) {
      // disable prev button when left end has reached 
      prevArrow.classList.add('disabled');
    } else {
      // both are enabled
      nextArrow.classList.remove('disabled');
      prevArrow.classList.remove('disabled');
    }
  }
});
