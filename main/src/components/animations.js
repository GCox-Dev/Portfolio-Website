
export function typeWriter(text, target, speed) {
    function animation(src, i, fnCallback) {
        if (i < src.length) {
            document.querySelector(target).innerHTML += src.charAt(i);
            setTimeout(() => animation(src, i+1, fnCallback), speed);
        } else if (typeof fnCallback == "function") {
            setTimeout(fnCallback, 800);
        }

    }

    function doAnimation(i) {
        if (i < text.length) {
            let src = text[i];
            document.querySelector(target).innerHTML = "";
            animation(src, 0, () => doAnimation(i+1));
        }
    }

    doAnimation(0);
}