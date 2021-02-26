'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
message.classList.add("cookie-message")
// message.textContent = `We use cookies for improved functionality and analytics.`
//remember that we can use both of these properties(innerHTML...textContent) to read and to set content
message.innerHTML =
  `We use cookie for improved functionality and analytics.
  <button class='btn btn--close--cookie'>Got it!</button>`;
//prepend
//   header.prepend(message);
  //append   we have both but we just can see one , that is because a DOM element is unique.
//it is useful also for move element because here element move from top to bottom
header.append(message)
//but if we want to get the massage in both place
// header.append(message.cloneNode(true))

//ok we want to put it top or bottom of header but where after or before
// header.before(message)
// header.after(message)

///////////////////////////////////////////////////////////////
//Delete elements
//with click
document.querySelector(".btn--close--cookie").addEventListener("click", function() {
  message.remove()
  //old method
  // message.parentElement.removeChild(message)
})

//Style
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

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
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//work with CSS custom properties,call CSS variables,>>>> like color in root
//with this because root is document and we can change the color
document.documentElement.style.setProperty("--color-primary", "red")
