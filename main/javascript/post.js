var slideIndex = 0;

function progressSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let demos = document.querySelectorAll('.demo');
    if (n == slides.length) {
        n = 0;
        slideIndex = 0;
    } else if (n < 0) {
        n = slides.length - 1;
        slideIndex = slides.length - 1;
    }
    let index = 0;
    slides.forEach((slide) => {
        if (index != n) {
            slide.style.display = "none";
            demos[index].classList.remove("act");
        } else {
            slide.style.display = "block";
            demos[index].classList.add("act");
        }
        index++;
    });
}