const current_year = document.querySelector('#current_year');
current_year.innerHTML = new Date().getFullYear();

document.getElementById("last_modified").innerHTML = document.lastModified

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x= document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;

