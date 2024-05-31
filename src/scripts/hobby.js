function toggleColor(colorId) {
    const colorElement = document.getElementById(colorId);
    const isActive = colorElement.classList.contains('active');

    // Reset all colors first
    document.querySelectorAll('.color').forEach(color => {
        color.classList.remove('active');
    });

    // If the clicked color was not active, activate it
    if (!isActive) {
        colorElement.classList.add('active');
    }
}

function resetColor(colorId) {
    const colorElement = document.getElementById(colorId);
    colorElement.classList.remove('active');
    event.stopPropagation(); // Prevent triggering the toggleColor function
}


function updateRectangleTransform() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    var b = w*0.84;
    var a = h*0.75;
    const A=[-b/(Math.sqrt(2)),b/Math.sqrt(2)];
    const B=[a/(Math.sqrt(2)),a/Math.sqrt(2)];

    const translateX = (A[0]+B[0])/2;
    const translateY = -(A[1]+B[1])/2;
    console.log('b:',b);
    console.log('a:',a);
    console.log('x:',translateX);
    console.log('y:',translateY);

    document.documentElement.style.setProperty('--translate-x', `${translateX}px`);
    document.documentElement.style.setProperty('--translate-y', `${translateY}px`);
    document.documentElement.style.setProperty('--card1-x', `${-translateX}px`);
    document.documentElement.style.setProperty('--card1-y', `${translateY}px`);
    document.documentElement.style.setProperty('--card2-x', `${-translateY}px`);
    document.documentElement.style.setProperty('--card2-y', `${translateX}px`);
    document.documentElement.style.setProperty('--card3-x', `${translateX}px`);
    document.documentElement.style.setProperty('--card3-y', `${-translateY}px`);
    document.documentElement.style.setProperty('--card4-x', `${translateY}px`);
    document.documentElement.style.setProperty('--card4-y', `${-translateX}px`);

    document.documentElement.style.setProperty('--card-width', `${b}px`);
}

window.addEventListener('resize', updateRectangleTransform);
window.addEventListener('DOMContentLoaded', updateRectangleTransform);

