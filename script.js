'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function(e) {
  //because it is the link with href = "#" >>> so ti goes to top that we dont want it
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////
//Smooth Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Button scrolling
btnScrollTo.addEventListener('click', function(e) {
  //show coordinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (x/y)`, window.pageXOffset, pageYOffset);

  //these client height and width here are not counting with the scroll bars.
  //It's just dimensions of the view port,that are actually available for the content.And of course that excludes any scroll bars.
  console.log(`height/width viewport`, document.documentElement.clientHeight, document.documentElement.clientWidth);

  //is because we need them to scroll to this first section
  //Scrolling
  //scrollto make animation and smooth scroll
  //top is the height of top of page till top of section 1
  //the position of the section here is always this top, which is from here to the view port, plus the current scroll position.
  // window.scrollTo(s1coords.left, s1coords.top)

  //but it doesnt work when you scroll a little bit down because y is less than top till that point
  //so we write window...
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // )

  //we also can pass it into the object
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });

  //new method...but it works just in the new browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////
//Page navigation
//scroll smooth with click
//first method
// document.querySelectorAll(".nav__link").forEach(function(el) {
//   el.addEventListener("click", function(e) {
//     e.preventDefault()
//     const id = this.getAttribute("href")
//     console.log(id);
//     document.querySelector(id).scrollIntoView( {
//       behavior: "smooth"
//     })
//   })
// })

//or
//second method
//1.add event listener to common parent element
//2.Determine what element originated the even

//because we can now use this information exactly to basically see where that event happened. So as I click here, we can
// now see, well, that the event occurred from this element.
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  //matching strategy
  //e.target
  if (e.target.classList.contains('nav__link')) {
    //with the clicks that happened on one of the links.basically only selected the link elements itself.
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});


//////////////////////////////////////////////////////////
//Sticky navigation
//it is jus for define , but it is not good way because it always give the number
// from top and it is not good for phone
const initialCoords = section1.getBoundingClientRect()
console.log(initialCoords);

window.addEventListener("scroll", function() {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add("sticky")
  else nav.classList.remove("sticky")
})
//Sticky navigations 


///////////////////////////////////////////////////
//tab component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container               ');
const tabContent = document.querySelectorAll('.operations__content');

//it is not good way, because when we have lots of it is cmsbor
// tabs.forEach(t => t.addEventListener("click", function(e) {
//   // const tar = e.target
//   console.log("hello");
// }))

//use events delegation >>>we need to attach the event handleron the common parent elementof all the elements that we're interested in.
tabsContainer.addEventListener('click', function(e) {
  //becase we have some part like span when click we have to say parent
  //even we click on the span we get button because we choose parentelement
  //but if we click on the button we get parent element..container
  // const clicked = e.target.parentElement
  //we want to get button no matter if we click here on the span or on button
  const clicked = e.target.closest('.operations__tab');
  // when we click on container not button there is no closest parent class so we get error
  //so we use egnor any click
  //Guard clause....it is modern
  //if there is not option countinue code
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));
  //Active tab
  clicked.classList.add('operations__tab--active');
  tabsContainer.for;

  //Active content area
  //we want to get number of content from data attribute
  //when we click every things is sorted in the clicked variable
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////////////////////////////
//menu fade animation
//the mouse enter event,
//
// and mouseover is actually similar to mouseenter,
//
// with the big difference that mouseenter
//
// does not bubble, okay?
//
// But here, we need the event to actually bubble
//we need to reach the navigation element
//So the opposite of mouseenter is mouseleave,
//and the opposite of this mouseover is mouseout.
// nav.addEventListener('mouseover', function(e) {
//   //I'm not using the closest methods.
//   //
//   // And that's because there are simply no child elements
//   //
//   // that we could accidentally click here
//   //
//   // in this link, right?
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     //instead of moving up like one or two steps, we can simply search for a parent which matches a certain query.
//     //when we find parent we can search for nav-link again...
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
//
// nav.addEventListener('mouseout', function(e) {
//   if (e.target.classlist.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

///////////////////////////////////////////////////////////////
//for summary....for repetitive
// const handleHover = function(e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };
// //we can not write handleHover(e, 0.5)...
// //So, remember that the bind method creates a copy of the function that it's called on,and it will set the disc keyword in this function call to whatever value that we pass into bind,
// nav.addEventListener('mouseover', function(e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function(e) {
//   handleHover(e, 1);
// });

//orrrrr

// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
//
// // Passing "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
//
const handleHover2 = function(e) {
  console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//we can not write handleHover(e, 0.5)...
//So, remember that the bind method creates a copy of the function that it's called on,and it will set the disc keyword in this function call to whatever value that we pass into bind,
nav.addEventListener('mouseover', handleHover2.bind(0.5));
nav.addEventListener('mouseout', handleHover2.bind(1))
///////////////////////////////////////////////////////////////
//selecting elements

//with these spactial elements we don't even need to write any selector
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
//but otherwise
//we use it a lots when we want to select the child element
const header = document.querySelector('.header');
//if you delete one btn in console it does count it
document.querySelectorAll('.section');
const allSection = document.querySelectorAll('.section');
console.log(allSection);
//getElement.....use an HTML collection which in some situations is useful but most of the time, I simply keep using
// query selector

document.getElementById('section--1');
//if you delete one btn in console it doesnt count it
const allButton = document.getElementsByTagName('button');
console.log(allButton);

document.getElementsByClassName('btn');

////////////////////////////////////////////////////////////
//Creating and Inserting elements
//in bankist we use insertAdjacentHTML for insert html file
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics.`
//remember that we can use both of these properties(innerHTML...textContent) to read and to set content
message.innerHTML =
  `We use cookie for improved functionality and analytics.
  <button class='btn btn--close--cookie'>Got it!</button>`;
//prepend
//   header.prepend(message);
//append   we have both but we just can see one , that is because a DOM element is unique.
//it is useful also for move element because here element move from top to bottom
header.append(message);
//but if we want to get the massage in both place
// header.append(message.cloneNode(true))

//ok we want to put it top or bottom of header but where after or before
// header.before(message)
// header.after(message)

///////////////////////////////////////////////////////////////
//Delete elements
//with click
document.querySelector('.btn--close--cookie').addEventListener('click', function() {
  message.remove();
  //old method
  // message.parentElement.removeChild(message)
});

//Style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//because it is inline style you can see just background in the console
console.log(message.style.color);
console.log(message.style.backgroundColor);
//so for geting these style that are in css
console.log(getComputedStyle(message).color);
//we can also see the property that we dont define in css but they have to be computed like height
console.log(getComputedStyle(message).height);
//if you want to add some value to the height
//but consider the top commend is string
//10 >>> it is for parseFloat
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//work with CSS custom properties,call CSS variables,>>>> like color in root
//with this because root is document and we can change the color
document.documentElement.style.setProperty('--color-primary', 'red');

//attribute //items in element like src href class alt >>> they have to be standard attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);
//set attribute
logo.alt = 'Beautiful minimalist logo';

//Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data Attribute
//they start with data-
//we have to use dataset
console.log(logo.dataset.versionNumber);

//classes
//we can add multiple classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
//is really called contains and not includes like it is called in arrays.
logo.classList.contains('c');

//Don't use it >>>because this will override all the existing classes and also it allows us to only put one class on any element
logo.className = 'negar';


///////////////////////////////////////////////////////
//events
//we're gonna talk a little bit more about events. Now, we already worked with events before, of course,but now let's
// add some more important concepts and also make things a bit more clear. So, an event is basically a signal that is
// generated by a certain dumb node and a signal means that something has happened,

//mouseenter event,
const h1 = document.querySelector('h1');

// it fires whenever a mouse enters a certain element. like hover in css
// h1.addEventListener("mouseenter", function() {
//   alert(`addEventListener: Great! You are reading the heading :)`)
// })
//or
// h1.onmouseenter = function(e) {
//   alert(`addEventListener: Great! You are reading the heading :)`)
// }

const alertH1 = function(e) {
  alert(`addEventListener: Great! You are reading the heading :)`);

  //if we want it to happend just once
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);


// h1.onmouseenter = function(e) {
//   setTimeout(() => alert(`addEventListener: Great! :)`), 5000)
//
//   h1.removeEventListener("mouseenter", alertH1)
// }
//we can remove it after the certain time has passed
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//for every event there is attribute in html

//////////////////////////////////////////////////////////////////
//
//for random number we have
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}`;
//
// //we want to use the color in header and show
// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   //that this keyword, points always to the element on which that event handler is attached.
//   //in this case that's gonna be  document.querySelector(".nav__link")
//   this.style.backgroundColor = randomColor();
//   //////event target/////target is where the event originated...target = where the event happen
//   //currentTarget>>>the element on which the event handler is attached.
//   //currenttarget = this >>>this is also the one pointing to the element on which the EventListener is attached to.
//   console.log('link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//
//   //stop propagation
//   //it means this event doesnt propagation to parents
//   //can sometimes fix problems in very complex applications
//   //but it is not good idea
//   // e.stopPropagation()
// });

//this is the parent of nav__link
//you see parent get own color>..because event happen at the document root and from there it then travels down to the
// target element. there bubbling up means that basically it's as if the event had also happened in all of the parent elements.
//when you click on link the nav__links color change also, but when you click on the nav__links , color of link doesnt
// change ...because bubbling change parent element not child
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });
//
// //like top case
// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target, e.currentTarget);
// //However, if we really do want to catch events during the capturing phase, we can define a third parameter in the addEventlistener function.
// // For example here, we can set the third parameter to true or false. And so let's set it to true. And so in this case where this used capture
// // parameter is set to true, the event handler will no longer listen to bubbling events,but instead, to capturing events.
// }, true);

//they get sam target because they get same event that is because of event bubbling.
//events are captured when they come down from the document route all the way to the target,
//but our event handlers are not picking up these eventsduring the capture phase.
//it's only listening for events in the bubbling phase,
// but not in the capturing phase. So that is the default behavior of the add event listener method, and the reason for
// that is that the capturing phase is usually irrelevant for us.bubbling phase can be very useful for something called
// event delegation.


//////////////////////////////////////////////////////////////////
//but of course we want this to happen smoothly. And so let's now go ahead, and use
// event delegation to implement this navigation.


//////////////////////////////////////////////////////////////////

//Going downwards: child
//when we want to choose child of parents
const h11 = document.querySelector('h1');
console.log(h1.querySelector('.highlight'));
//that nodes can be anything so they can be texts
//give us every single nodes that there is
console.log(h1.childNodes);
//this just works for direct element
console.log(h1.children);
//first element of all children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
//we want to choose parent element and no matter how far away it is and the Dom tree.
//for this we have closest() method>>>And so the closest method receives a query string just like querySelector and querySelectorAll.
//closets
//So we can think of closest here as basically being the opposite of querySelector. So both receive a query string as an
// input but querySelector, finds children, no matter how deep in the Dom tree,while the closest method finds parents.
// And also no matter how far up in the Dom tree.
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: siblings
//just direct sibling>>privies or next
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
//for show all of sibling
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function(el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});




