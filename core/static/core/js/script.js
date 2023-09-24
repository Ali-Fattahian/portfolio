const getHoverDirection = function (event) {
  const directions = ['top', 'right', 'bottom', 'left'];
  const item = event.currentTarget;

  const w = item.offsetWidth;
  const h = item.offsetHeight;

  const x = (event.clientX - item.getBoundingClientRect().left - (w / 2)) * (w > h ? (h / w) : 1);
  const y = (event.clientY - item.getBoundingClientRect().top - (h / 2)) * (h > w ? (w / h) : 1);

  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

  return directions[d];
};

document.addEventListener('DOMContentLoaded', function () {

  const items = document.getElementsByClassName('project');
  for (let i = 0; i < items.length; i++) {

    ['mouseenter', 'mouseleave'].forEach(function (eventname) {
      items[i].addEventListener(eventname, function (event) {

        const dir = getHoverDirection(event);

        event.currentTarget.classList.remove('mouseenter');
        event.currentTarget.classList.remove('mouseleave');
        event.currentTarget.classList.remove('top');
        event.currentTarget.classList.remove('right');
        event.currentTarget.classList.remove('bottom');
        event.currentTarget.classList.remove('left');

        event.currentTarget.className += ' ' + event.type + ' ' + dir;

      }, false);
    });
  }
});


const nav = document.querySelector("#nav");
const allSectionsExceptNavSec = document.querySelectorAll(
  ".container > section:not(#section--1)"
);

const navHoverHandle = function (e, opacity) {
  if (e.target.classList.contains("nav__item")) {
    const currentEl = e.target;
    const allNavEl = currentEl.closest("#nav").querySelectorAll(".nav__item");
    allNavEl.forEach((el) => {
      if (el !== currentEl) el.style.opacity = opacity;
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  navHoverHandle(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  navHoverHandle(e, 1);
});

document.querySelector('#nav').addEventListener('click', function(e) {
  if (!e.target.classList.contains('nav__download')) {
    e.preventDefault();

  if (e.target.classList.contains('nav__item')) {
      const id = e.target.getAttribute('href');
      const sectionEl = document.querySelector(id);
      const sectionElCoords = sectionEl.getBoundingClientRect();
      window.scrollTo({
          left: sectionElCoords.left + window.pageXOffset,
          top: sectionElCoords.top + window.pageYOffset,
          behavior: 'smooth',
      });
  };
  }
  
});


const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: .3,
});

allSectionsExceptNavSec.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const form = document.querySelector('.contact-me__form')
const messageEl = document.querySelector('.message')

const formSubmitHandler = (e) => {
  e.preventDefault()

  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const subject = document.getElementById('subject')
  const message = document.getElementById('message')

  if (name.value.length > 0 && email.value.length > 0 && subject.value.length > 0 && message.value.length > 0) {
    sendData(name.value.trim(), email.value.trim(), subject.value.trim(), message.value.trim())
  } else {
    messageEl.firstChild.textContent = "Please fill out all the fields."
    messageEl.style.color = '#d62323'
    messageEl.classList.remove('hidden')
  }
}


async function sendData(name, email, subject, message) {
  try{
    const respone = await fetch('http://localhost:8000/create-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: name,
        email,
        subject,
        content: message
      })
    })
    const res = await respone.json()
    if (res) {
      messageEl.firstChild.textContent = 'Thanks for sending the message, i will try to send you a reponse email as soon as i can.'
      messageEl.style.color = '#29BF12'
      messageEl.classList.remove('hidden')
      form.reset()
    }
  } catch(err) {
    messageEl.firstChild.textContent = err.message
    messageEl.style.color = '#d62323'
    messageEl.classList.remove('hidden')
  }

}

const closeMessage = document.querySelector('.message-close')
closeMessage.addEventListener('click', () => {
  messageEl.classList.add('hidden')
})
form.addEventListener('submit', formSubmitHandler)
