const typeAnimation = (txt, tar, spd) => {
    const textElement = document.querySelector(`.${tar}`);
    var i = 0;
    textElement.textContent = "";
    function typeWriter() {
        if (i < txt.length) {
            textElement.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, spd);
        }
    }

    typeWriter();
}

let dashOn = false;

const flashingDash = (txt, tar, spd) => {
    const textElement = document.querySelector(`.${tar}`);
    console.log(textElement);
    function frame() {
        if (dashOn) textElement.innerHTML = `${txt}_`;
        else textElement.innerHTML = txt;
        dashOn = !dashOn;
        console.log(dashOn);
    }
    setInterval(() => frame(), spd);
}

function homeScreenAnimation() {
    window.setTimeout(() => typeAnimation("Web Dev", "header-title", 150), 300);
    window.setTimeout(() => typeAnimation("App Dev", "header-title", 150), 3100);
    window.setTimeout(() => typeAnimation("GCox Dev", "header-title", 150), 6500);
    window.setTimeout(() => flashingDash("GCox Dev", "header-title", 500), 7700);
}
