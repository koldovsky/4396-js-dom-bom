const title = document.querySelector('.header__title');

const greetings = [
    'Welcome to our website!',
    'Enjoy your stay!',
    'Have a great day!',
    'Explore our features!',
    'Stay tuned for updates!'
];

title.innerText = greetings[Math.floor(Math.random() * greetings.length)];
title.style.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;