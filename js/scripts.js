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
    console.log('Removing loader');
    tlLoader.repeat(0);
    tlMain.addLabel('opswitch')
        .to(main, { duration: 1, opacity: 1, ease: Power1.easeInOut }, 'opswitch')
        .from(main, { duration: 1, y: window.innerHeight / 2 }, 'opswitch')
        .set(loader, { opacity: 0, display: 'none', ease: Power1.easeInOut }, 'opswitch')
}

window.onload = () => {
    setTimeout(removeLoader, 4000)
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


//card displays subcategories on hover
const categoryCard = document.querySelectorAll('.category__card');

categoryCard.forEach((card) => {
    const hoverCard = gsap.timeline({ paused: true, ease: "Power1.easeIn" })
        .addLabel('hoverCard')
        .to(card.querySelector('.card__overlay'), { y: '-50%', duration: .9 }, 'hoverCard') //card moves up
        .fromTo(card.querySelector('img'), .7, { scale: 1, filter: 'brightness(1)' }, { scale: 1.5, filter: 'brightness(0.6)' }, 'hoverCard') //image zooms in
        .to(card.querySelector('.overlay__hidden'), { height: 'auto', opacity: .7, duration: .9 }, 'hoverCard+=.1') //hidden display is made visible

    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 425) {
            hoverCard.play();
        }
    })

    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 425) {
            hoverCard.reverse();
        }
    })
})

//remove label from product on click
const productImages = document.querySelectorAll('.product-image');

productImages.forEach((productImage) => {
    const imgSwitch = gsap.timeline({ paused: true })
        .set(productImage.querySelector('.product-image__second'), { display: 'block' })
        .set(productImage.querySelector('.product-image__first'), { display: 'none' })
        .set(productImage.parentElement.querySelector('.label-overlay'), { display: 'none' })
        .set(productImage.querySelector('.image__hidden-display'), { display: 'flex' })
        .from(productImage.querySelector('.image__hidden-display'), { duration: .4, autoAlpha: 0, y: '-1.2rem' })

    productImage.addEventListener('mouseenter', () => {
        console.log('product');
        imgSwitch.play();
    })

    productImage.addEventListener('mouseleave', () => {
        imgSwitch.reverse();
    })
})


var collapsed = true;
function navbarToggle() {
    var smd = document.querySelectorAll(".navbar__smd");

    if (collapsed) {
        gsap.to(smd, { height: 'auto', overflow: 'visible', marginBottom: '1rem' });
    } else {
        gsap.to(smd, { height: 0, overflow: 'hidden',  marginBottom: '0rem' });
    }

    collapsed = !collapsed;
}
