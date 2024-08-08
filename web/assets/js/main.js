function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelector('.primary-links'),
      hamburger = document.querySelector('.icon.nav-js'),
      nav = document.querySelector('nav'),
      body = document.querySelector('body');

  // open menu
  hamburger.addEventListener('click', function () {
    nav.classList.toggle('menu-opened');
    body.classList.toggle('no-scroll');
  });
  
  // close menu
  function closeMenu() {
    nav.classList.remove('menu-opened');
    body.classList.remove('no-scroll');
  }

  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.close')) {
      closeMenu();
    }
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
    if (window.scrollY > 10) {
      nav.classList.add(scrolledClass);
    } else {
      nav.classList.remove(scrolledClass);
    }
    // closeMenu();
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

  // projectOverview scroll animation
  const projects = document.querySelectorAll(".project");

  function updateObserver() {
      const navHeight = nav.offsetHeight;

      const observerOptions = {
          root: null,
          rootMargin: `-${navHeight}px 0px -${navHeight}px 0px`,
          threshold: buildThresholdList()
      };

      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      projects.forEach((project) => observer.observe(project));
  }

  function buildThresholdList() {
      let thresholds = [];
      let numSteps = 100; // number of animation steps
      for (let i = 1.0; i <= numSteps; i++) {
          thresholds.push(i / numSteps);
      }
      thresholds.push(0);
      return thresholds;
  }

  function handleIntersect(entries) {
      entries.forEach((entry) => {
          const overlay = entry.target.querySelector('.overlay');
          const text = entry.target.querySelector('.text');

          if (overlay) {
            const opacity = 0.8 - (entry.intersectionRatio * 1);
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
          }

          text.style.opacity = `${entry.intersectionRatio}`;
      });
  }

  updateObserver();

  window.addEventListener('resize', updateObserver);
  
});


// Universal slider with arrow functionality
// var instances = document.querySelectorAll(".slider");

// instances.forEach(function (instance) {
//   var arrows = instance.querySelectorAll(".arrow"),
//     prevArrow = instance.querySelector('.arrow-prev'),
//     nextArrow = instance.querySelector('.arrow-next'),
//     box = instance.querySelector(".slider-inner"),
//     x = 0,
//     mx = 0,
//     maxScrollWidth = box.scrollWidth - (box.clientWidth / 2) - (box.offsetWidth / 2);

//   arrows.forEach(function (arrow) {
//     arrow.addEventListener('click', function () {
//       if (this.classList.contains("arrow-next")) {
//         x = ((box.offsetWidth / 1.5)) + box.scrollLeft - 10;
//         box.scrollTo({
//           left: x,
//           behavior: 'smooth'
//         });
//         console.log('next');
//       } else {
//         x = ((box.offsetWidth / 1.5)) - box.scrollLeft - 10;
//         box.scrollTo({
//           left: -x,
//           behavior: 'smooth'
//         });
//         console.log('prev');
//       }
//     });
//   });

//   box.addEventListener('mousemove', function (e) {
//     var mx2 = e.pageX - this.offsetLeft;
//     if (mx) this.scrollLeft = this.sx + mx - mx2;
//   });

//   box.addEventListener('mousedown', function (e) {
//     this.sx = this.scrollLeft;
//     mx = e.pageX - this.offsetLeft;
//   });

//   box.addEventListener('scroll', function () {
//     toggleArrows();
//   });

//   document.addEventListener("mouseup", function () {
//     mx = 0;
//   });

//   function toggleArrows() {
//     if (box.scrollLeft > maxScrollWidth - 10) {
//       // disable next button when right end has reached 
//       nextArrow.classList.add('disabled');
//     } else if (box.scrollLeft < 10) {
//       // disable prev button when left end has reached 
//       prevArrow.classList.add('disabled');
//     } else {
//       // both are enabled
//       nextArrow.classList.remove('disabled');
//       prevArrow.classList.remove('disabled');
//     }
//   }
// });
