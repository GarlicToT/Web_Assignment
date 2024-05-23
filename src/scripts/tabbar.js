window.onload = function() {
    // get tabbar html
    fetch('../html/tabbar.html')
    .then(response => response.text())
    .then(data => {
        // add tabbar to the page
        document.getElementById("tabbar").innerHTML = data;

        // Add event listeners for dropdown functionality
        const dropdown = document.querySelector('.dropdown');
        let timeout;

        dropdown.addEventListener('mouseover', () => {
            clearTimeout(timeout);
            dropdown.querySelector('.dropdown-content').style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            }, 300); 
        });
    });
}
