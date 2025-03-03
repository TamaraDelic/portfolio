function changeImage(smallImg) {
    const mainImage = document.getElementById("mainImage");
    
    if (mainImage.src == smallImg.src) return;
    
    const all_small = document.querySelectorAll(".small-img");
    
    all_small.forEach(item=>{
        item.classList.remove("active");
    });
    
    smallImg.classList.add("active");
    
    // Fade out
    mainImage.style.opacity = "0";

    // Wait for fade out, then change image and fade in
    setTimeout(() => {
        mainImage.src = smallImg.src;
        mainImage.style.opacity = "1";
    }, 500);
}

function initialScrollForModeling() {
    const targetElement = document.getElementById('focusImg');
    const scrollElement = document.getElementById('scroller');

    if (targetElement) {
//        const elementPosition = targetElement.getBoundingClientRect().left + window.scrollX - 880;
        const elementPosition = targetElement.getBoundingClientRect().left - 300;
        scrollElement.scrollTo({
            left: elementPosition,
            behavior: 'smooth'
        });
    }
}

function show_content(project) {
    console.log(project);
    const projectElement = document.getElementById(project.replace("-content", ""));
    console.log(projectElement);
    const projectContent = document.getElementById(project);
    if (projectContent.classList.contains('active')) {
        projectContent.classList.remove('active');
        projectElement.classList.remove('active');
        projectContent.style.maxHeight = "0px";
        projectContent.style.padding = "0px";
        return;
    }
    
    const all_contents = document.querySelectorAll('.project-content');
    all_contents.forEach(item => {
        item.classList.remove('active');
        item.style.maxHeight = "0px";
        item.style.padding = "0px";
    });
    const all_projects = document.querySelectorAll('.project');
    all_projects.forEach(item => {
        item.classList.remove('active');
    });
    
    projectContent.classList.add('active');
    projectElement.classList.add('active');
    const newMaxHeight = projectContent.scrollHeight + 130;
    projectContent.style.maxHeight = newMaxHeight + "px";
    projectContent.style.padding = "1.9rem 0rem";
    
    if (project === "modeling-content") {
        initialScrollForModeling();
    }
}


function scrollToContent(project) {
        
    let projectContentElement = document.getElementById(project);
    
    let offset = 210;
    
    let interval = 0; // 20
    if (["web-dev", "design", "interior"].indexOf(project) != -1) {
        interval = 300;
    }
    
    
    if (!projectContentElement) return;

    // Wait until .card-content height exceeds 50px
    const checkHeight = setInterval(() => {
        if (projectContentElement.scrollHeight > 150) {
            clearInterval(checkHeight); // Stop checking once height is big enough

            // Calculate and scroll to the correct position
            const elementPosition = projectContentElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Specific case for modeling projects
            if (project === "modeling") {
                initialScrollForModeling();
            }
        }
    }, interval); // Check every 50ms
}

// Auto-reveal based on URL query (from Page 1 links)
window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const project = params.get('project');
    
    if (project) {
        show_content(project + "-content");
        scrollToContent(project, );
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    projects.forEach(item => {
        item.addEventListener('click', () => {
            show_content(item.id + "-content");
        });
    });
    
});


// mobile resize
// sredi resume
// prijavi se
// pack into atlas
// freelance
// videi sa autorskim pravima
// 

