<!DOCTYPE html>
<html>
    <head>
        <!-- Meta Data -->
        <title></title>
        <meta charset="UTF-8">
        <meta name="author" content="Grant Cox">
        <meta name="viewport" content="width=device-width initial-scale=1.0">

        <!-- Linking of External Files -->
        <link rel="shortcut icon" tpye="image/x-icon" href="../../assets/favicon.ico">
        <link rel="stylesheet" href="../../styles/style.css">
        <link rel="stylesheet" href="../../styles/posts.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
        
        <script src="https://kit.fontawesome.com/3abbd89c02.js" crossorigin="anonymous"></script>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NTYT7KHMTW"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QXWQG34W3L');
        </script>

    </head>
    <body>
        <section class="header">
            <nav class="nav-bar">
                <div class="site-identity">
                    <a href="../" class="site-link">
                        <img class="site-logo" src="../../assets/logo.svg">
                        <h3>portfolio</h3>
                    </a>
                </div>
                <div class="spacer"></div>
                <ul class="nav-links">
                    <li>
                        <a href="../../">Home</a>
                    </li>
                    <li>
                        <a href="../../projects/">Projects</a>
                    </li>
                    <li>
                        <a href="../../">About</a>
                    </li>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
            <canvas class="header-animation">
            </canvas>
            <div class="header-content">
                <code class="header-title">
                </code>
                <i class="fas fa-chevron-down call-to-action"></i>
            </div>
        </section>
        <article class="article">
            <code class="title-text">
                
            </code>
            <div class="section">
                <p></p>
            </div>
            <code class="header-text">Pictures</code>
            <div class="slide-show">
                <!-- <div class="slide"><img src="assets/img1.jpg"></div> -->
                <a class="prev" onclick="progressSlide(-1)"><i class="fas fa-chevron-left"></i></a>
                <a class="next" onclick="progressSlide(1)"><i class="fas fa-chevron-right"></i></a>
                <div class="demo-container">
                    <!-- <img class="demo" src="assets/img1.jpg" onclick="currentSlide(0)"> -->
                </div>
            </div>
            <code class="header-text">Design Process</code>
            <div class="section">
                <p></p>
            </div>
            <code class="header-text">Conclusion</code>
            <div class="section">
                <p></p>
            </div>
            <div class="section"><a target="_blank" href="">Code</a></div>
        </article>
        <footer class="one-section">
            <div class="socials">
                <code>Follow Me:</code>
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/grant-cox-545300226/" target="_blank">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/gcoxdev/" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://github.com/gcox-dev" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="mailto: gcoxdev@gmail.com" target="_blank">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
            </div>
        </footer>
        <i class="fas fa-chevron-up to-top"></i>
        <script tpye="text/javascript" src="../../javascript/canvasanimation.js"></script>
        <script tpye="text/javascript" src="../../javascript/index.js"></script>
        <script tpye="text/javascript" src="../../javascript/post.js"></script>
        <script>
            function main() {
                navSlide();
                toTopIn();
                callToAction();
                titleAnimation('');
                onScroll([toTopIn]);
                button('to-top', () => sendTo('header', 1000));
                button('call-to-action', () => sendTo('article', 1000));
                showSlides(slideIndex);
            }

            main();
        </script>
    </body>
</html>