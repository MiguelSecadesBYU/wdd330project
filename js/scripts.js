const year = document.querySelector('#year');
year.innerHTML = new Date().getFullYear();

document.getElementById("modify").innerHTML = document.lastModified

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x= document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;