const sectionTitles = {
    about: "Hello!",
    projects: "My projects",
    skills: "What I can do",
    contact: "Get in touch"
};

let lastScrollY = 0;
let scrollDirection = 'down';
let directionOnChange = 'down';
let previousActiveCard = null;
let activeCard = document.getElementById('about');
const firstViewportThird = window.innerHeight / 3;
const lastViewportThird = window.innerHeight - window.innerHeight / 3;
const viewportEnd = window.innerHeight;
const contentTitle = document.getElementById("header-title");

let jumpingToSection = false; // Flag to track menu click scrolling

function scrollToSection(sectionId) {
    jumpingToSection = true;

    const section = document.getElementById(sectionId);
    
    if (section) {
        const yOffset = -50; // Adjust for fixed headers if needed
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        setTimeout(() => {
            jumpingToSection = false;
            contentTitle.textContent = sectionTitles[section.id];
            setActiveMenuItem(activeCard.id, false);
            setupCardStyle(activeCard, true);
        }, 500); // Adjust timeout based on scroll speed
    }
}

// Function to set the active menu item
function setActiveMenuItem(sectionId, hover) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(menuItem => {
        if (menuItem.id === "Menu") return;
        const imgMenuElement = menuItem.querySelector("img");
        if (hover) {
            imgMenuElement.src = imgMenuElement.src.replace("-hover.png", ".png");
        } else {
            menuItem.classList.remove('active');
            imgMenuElement.src = imgMenuElement.src.replace("-selected.png", ".png");
        }
    });

    const activeMenuItem = document.getElementById(sectionId + "Menu");
    if (hover && activeMenuItem.classList.contains('active')) return;

    if (activeMenuItem) {
        const imgMenuElement = activeMenuItem.querySelector("img");
        
        if (hover) {
            imgMenuElement.src = imgMenuElement.src.replace(".png", "-hover.png");
        } else {
            activeMenuItem.classList.add('active');
            if (imgMenuElement.src.includes('hover')) {
                imgMenuElement.src = imgMenuElement.src.replace("-hover.png", "-selected.png");
            } else {
                imgMenuElement.src = imgMenuElement.src.replace(".png", "-selected.png");
            }
            
        }
    }
}

function setupCardStyle(cardd, active) {
    if (active) {
        if (!cardd.classList.contains('visible')) {
            cardd.classList.add('visible');
        }
//        cardd.style.opacity = 1;
//        cardd.style.transform = 'translateX(0px)';
    } else {
        if (cardd.classList.contains('visible')) {
            cardd.classList.remove('visible');
        }
//        cardd.style.opacity = 0;
//        cardd.style.transform = 'translateX(8.125rem)';
    }
}

function show_section(card) {
    if (!card || !activeCard) return;
    // if it was not already active card
    // and not previous if direction is not change
    if (card.id != activeCard.id && !(previousActiveCard && card.id == previousActiveCard.id && directionOnChange == scrollDirection)) {
        // update previous card 
        previousActiveCard = activeCard;
        // update active
        activeCard = card;
        directionOnChange = scrollDirection;
        
        
        if (jumpingToSection) return;
        // setup new style for active
        setupCardStyle(activeCard, true);
        
        //if (jumpingToSection) return;
        
        // change current title
        const newTitle = sectionTitles[activeCard.id];
        contentTitle.textContent = newTitle;

        // change Active Menu Item
        setActiveMenuItem(activeCard.id, false);
    }
}

function openMenu() {
    const dropdown = document.querySelector(".dropdown");
    const menu = dropdown.querySelector(".dropdown-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}



// Function to track the scroll position and update card visibility
//window.addEventListener('scroll', async () => {
function onScroll() {
    
    // current ScrollY value
    const currentScrollY = window.scrollY;
    
    // get state of scrolling
    if (currentScrollY > lastScrollY) {
        if (scrollDirection != 'down') {
            scrollDirection = 'down';
        }
    } else {
        if (scrollDirection != 'up') {
            scrollDirection = 'up';
        }
    }
    
    // get all Cards
    const cards = document.querySelectorAll('.card');
    
    // To ensure only the first valid card triggers the change
//    let triggered = false;
    
    // for each card check its position and change its style based on the location if needed
    for (const card of cards) {
        // boundaries of the card
        const rect = card.getBoundingClientRect();
        // top of the card
        const cardStart = rect.top;
        // bottom of the card
        const cardEnd = rect.top + rect.height;
        
        // check if card has condition to be active card
        if (cardStart <= lastViewportThird && cardEnd >= firstViewportThird) {
            show_section(card);
        }
    }
    
    // update previous card if needed
    if (previousActiveCard) {
        const prevRect = previousActiveCard.getBoundingClientRect();
        // scrolling down
        if (scrollDirection == 'down') {
            const prevCardEnd = prevRect.bottom;

            if (prevCardEnd > 0 && prevCardEnd <= firstViewportThird) {
                setupCardStyle(previousActiveCard, false)
            }
        } 
        // scrolling up
        else {
            const prevCardStart = prevRect.top;

            if (prevCardStart < viewportEnd && prevCardStart >= lastViewportThird) {
                setupCardStyle(previousActiveCard, false)
            }
        }
    }

    // update scroll value
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', onScroll);

window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
        scrollToSection(section);
    } else {
        scrollToSection('about');
    }
};



// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.id === "Menu") return;
        item.addEventListener('click', event => {
            const sectionId = item.id;
            setActiveMenuItem(sectionId.replace("Menu", ""), false);
        });
        item.addEventListener('mouseover', event => {
            const sectionId = item.id;
            setActiveMenuItem(sectionId.replace("Menu", ""), true);
        });
    });
    
    const dropItems = document.querySelectorAll('.dropdown-item a');
    dropItems.forEach(item => {
        item.addEventListener('click', event => {
            const sectionId = item.id;
            setActiveMenuItem(sectionId.replace("Drop", ""), false);
            scrollToSection(sectionId.replace("Drop", ""));
        });
    });

    //scrollToSection('about'); // Ensure starting state is correct
    
});
