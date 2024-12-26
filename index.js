var log = console.log;
const cardContElement = document.querySelector('.js-card-cont');
let  cardContElementItems = undefined;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const positionSticky = document.querySelector('.position-sticky');

// card variables;
let currentCardContScrollPosition = cardContElement.scrollLeft;
let cardContElementItemWidth = undefined;


cardData = [
    {
        bgImg: `imgs/scroller-img-1.webp`,
        id: `1`,
    },
    {
        bgImg: `imgs/scroller-img-2.webp`,
        id: `2`,
    },
    {
        bgImg: `imgs/scroller-img-3.webp`,
        id: `3`,
    },
    {
        bgImg: `imgs/scroller-img-4.webp`,
        id: `4`,
    },
    {
        bgImg: `imgs/scroller-img-5.webp`,
        id: `5`,
    },
    {
        bgImg: `imgs/scroller-img-6.webp`,
        id: `6`,
    },
    {
        bgImg: `imgs/scroller-img-7.webp`,
        id: `7`,
    },
    {
        bgImg: `imgs/scroller-img-8.webp`,
        id: `8`,
    },
    {
        bgImg: `imgs/scroller-img-9.webp`,
        id: `9`,
    },
    {
        bgImg: `imgs/scroller-img-10.webp`,
        id: `10`,
    },
]

renderCard();
onloadSetups();
function renderCard(){
    let cardHTML = ``;
    cardData.forEach(data => {
        cardHTML += `
            <button style="background-image: url(${data.bgImg});" class="js-trending__card tending__btn-card">
                <span class="card-number-lable">${data.id}</span>
            </button>
        `;
    });
    cardContElement.innerHTML = cardHTML;
};


function onloadSetups(){
    window.addEventListener('load', () => {
        if (cardContElement.firstChild.nextSibling.children[0].innerText == 1){
            prevButton.style.display = 'none';
        };
        cardContElementItems = document.querySelectorAll('.tending__btn-card');
        cardContElementItemWidth = cardContElementItems[0].offsetWidth;
    });
};

function handleQuestions(element){
    if (element.getAttribute('data-isExpanded') == 'false'){
        element.setAttribute('data-isExpanded', true);
        
        document.querySelector(`.answer-${element.getAttribute('data-id')}`).style.display = 'block';

        // change + sign to x;
        element.classList.contains('question__wrapper') 
        ? element.firstChild.nextElementSibling.children[1].innerText = 'x'
        : element.innerText = 'x';
    } else {
        element.setAttribute('data-isExpanded', 'false');
        document.querySelector(`.answer-${element.getAttribute('data-id')}`).style.display = 'none';

        // change x sign to +;
        element.classList.contains('question__wrapper') 
        ? element.firstChild.nextElementSibling.children[1].innerText = '+'
        : element.innerText = '+';
    }
};

let isScrolling = undefined;
let scrolledTime = 0;
let lastScroll = 0;
const animationDuration = 205; //currelates with animation duration in css
function hideShowPositonSticky() {
    clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
        scrolledTime++;
        if (scrolledTime == 2){
            scrolledTime = 0;
            let currentScroll = document.documentElement.scrollTop;
            if (lastScroll > currentScroll){
                positionSticky.classList.add('slideInShow');
                clearAnimation('slideOutHide'); // remove opposite classd 
            } else {
                positionSticky.classList.add('slideOutHide');
                clearAnimation('slideInShow');
            };
        };
        lastScroll = document.documentElement.scrollTop; 
    }, 100);
};

function clearAnimation(oppositeClass) {
    setTimeout(() => {
        positionSticky.classList.remove(oppositeClass)
    }, animationDuration); 
}

function scrollCards(clickedButton) {
    if (clickedButton == 'next'){
        cardContElement.scrollLeft = currentCardContScrollPosition + cardContElementItemWidth;
        currentCardContScrollPosition = cardContElement.scrollLeft;
        // show the prev button
        prevButton.style.display = 'inline-block'

    } else {
        cardContElement.scrollLeft = currentCardContScrollPosition - cardContElementItemWidth;
        currentCardContScrollPosition = cardContElement.scrollLeft;
    }

    // cardContElement.scrollLeft = cardContainerWidth * increament;
}

nextButton.addEventListener('click', ()=> {
    scrollCards('next');
});
prevButton.addEventListener('click', () => {
    scrollCards('prev');
})

document.querySelectorAll('.faq__expand-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        handleQuestions(button);        
    });
});
document.querySelectorAll('.question__wrapper').forEach(question => {
    question.addEventListener('click', (e) => {
        handleQuestions(question);        
    });
});

// window events
window.addEventListener('scroll', (e) => {
    hideShowPositonSticky()
});
window.addEventListener('resize', (e) => {
    // update the cardContainer's width on window resize

    cardContElementItemWidth = cardContElementItems[0].offsetWidth;
});





