const main = document.querySelector('#main-container');
const loader = document.querySelector('#loader');
const dots = document.querySelectorAll('.dot');
const tlLoader = gsap.timeline({ repeat: -1 });
main.style.opacity = 0;

const tlMain = new TimelineMax({ duration: 1.3 });

//intial page loading
tlLoader
    .staggerFromTo(dots, 0.5, {
        y: 0,
        autoAlpha: 0
    }, {
        y: 20,
        autoAlpha: 1,
        ease: Back.easeInOut
    },
        0.1
    )

//remve preloader and display main page
const removeLoader = () => {
    tlLoader.repeat(0);
    tlMain.addLabel('opswitch')
        .to(main, { duration: 1, opacity: 1, ease: Power1.easeInOut }, 'opswitch')
        .from(main, { duration: 1, y: window.innerHeight / 2 }, 'opswitch')
        .set(loader, { opacity: 0, display: 'none', ease: Power1.easeInOut }, 'opswitch')
}

window.onload = () => {
    removeLoader()
    AOS.init({ once: true, duration: 1500, delay: 300 });
    tlChangeText.play();
}

//changing hero text
const changingText = document.querySelectorAll('.changing-text')

const tlChangeText = new TimelineLite({
    defaultEase: Circ.easeInOut, paused: true,
    onComplete: function () {
        tlChangeText.restart();
    }
}).add(TweenMax.staggerFromTo(
    changingText, .6,
    {
        opacity: 0,
        y: 30,
    },
    {
        opacity: 1,
        y: 0,
    },
    3.2))
    .add(TweenMax.staggerTo(
        changingText, .6,
        {
            delay: .3,
            opacity: 0,
            y: -30,
        },
        3), 2.5)

//expand se


//card displays subcategories on hover
const categoryCard = document.querySelectorAll('.category__card');

categoryCard.forEach((card) => {
    const hoverCardTl = gsap.timeline({ paused: true, ease: "Power1.easeIn" })
        .addLabel('hoverCard')
        .to(card.querySelector('.card__overlay'), { top: '50%', duration: .9 }, 'hoverCard') //card moves up
        .fromTo(card.querySelector('img'), .7, { scale: 1, filter: 'brightness(1)' }, { scale: 1.5, filter: 'brightness(0.6)' }, 'hoverCard') //image zooms in
        .to(card.querySelector('.overlay__hidden'), { height: 'auto', opacity: .7, duration: .9 }, 'hoverCard+=.1') //hidden display is made visible

    const hoverCardMobTl = gsap.timeline({ paused: true, ease: "Power1.easeIn" })
        .addLabel('hoverCard')
        .to(card.querySelector('.card__overlay'), { bottom: '-50%', height: '100%', duration: .9 }, 'hoverCard') //card moves up
        .fromTo(card.querySelector('img'), .7, { scale: 1, filter: 'brightness(1)' }, { scale: 1.5, filter: 'brightness(0.6)', duration: .9 }, 'hoverCard') //image zooms in
        .set(card.querySelector('.overlay__hidden'), { autoAlpha: 1 }, 'hoverCard+=.1') //hidden display is made visible
        .to(card.querySelector('.overlay__hidden'), { height: 'auto', duration: .2 }, 'hoverCard+=.7') //hidden display is made visible

    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 425) {
            hoverCardTl.play();
        }
    })

    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 425) {
            hoverCardTl.reverse();
        }
    })

    //animation for smaller screens
    if (('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent))) {
        let clicked = false;

        card.addEventListener('click', () => {
            if (!clicked) {
                hoverCardMobTl.play()
                clicked = !clicked
            } else {
                hoverCardMobTl.reverse()
                clicked = !clicked
            }
        })
    }
})

//remove label from product on click
const cardProducts = document.querySelectorAll('.card.product');

cardProducts.forEach((cardProduct) => {
    const imgSwitchTl = gsap.timeline({ paused: true })
        .addLabel('start')
        .set(cardProduct.querySelector('.product-image__second'), { autoAlpha: 1 }, 'start+=.25')
        .set(cardProduct.querySelector('.product-image__first'), { autoAlpha: 0 }, 'start+=.25')
        .to(cardProduct.querySelector('.image__hidden-display'), { duration: .5, autoAlpha: 1 }, 'start')
        .staggerFromTo(cardProduct.querySelectorAll('.hidden-display__icon'), .5, { y: '100%' }, { y: '0' }, 0.2, 'start')
        .staggerTo(cardProduct.querySelectorAll('.hidden-display__icon'), .5, { autoAlpha: 1 }, 0.2, 'start')

    cardProduct.addEventListener('mouseenter', () => { if (window.innerWidth > 425) { imgSwitchTl.play() } })

    cardProduct.addEventListener('mouseleave', () => { if (window.innerWidth > 425) { imgSwitchTl.reverse() } })

})


//toggle navbar
const navbarToggler = document.querySelector('#navbar-toggler');
let collapsed = true;
let smd = document.querySelectorAll(".navbar__smd");
const collapseNavTl = gsap.timeline({ paused: true }).addLabel('start')
    .to(smd, .75, { css: { height: 'auto', overflow: 'visible', marginBottom: 25 }, ease: Power1.easeInOut }, 'start')
    .set(smd, { autoAlpha: 1 }, 'start+=.8')

navbarToggler.addEventListener('click', navbarToggle);

function navbarToggle() {
    if (collapsed) {
        collapseNavTl.play()
    } else {
        collapseNavTl.reverse();
    }

    collapsed = !collapsed;
}


// display blog posts
const cardBlog = document.querySelectorAll('.card__blog');

cardBlog.forEach((blog) => {
    const blogOverlayTl = gsap.timeline({ paused: true })
        .to(blog.querySelector('.blog-overlay'), .25, { autoAlpha: 1 })

    blog.addEventListener('mouseenter', () => {
        blogOverlayTl.play();
    })

    blog.addEventListener('mouseleave', () => {
        blogOverlayTl.reverse();
    })

})
