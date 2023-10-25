const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navbar = document.getElementById('nav-bar');

btnHam.addEventListener
('click',function(){
    if(btnHam.className != "")
    {
        btnHam.style.display="none";
        btnTimes.style.display="block";
        navbar.classList.add("show-nav");
    }
})

btnTimes.addEventListener
('click',function(){
    this.style.display="none";
    btnHam.style.display="block";
    navbar.classList.remove("show-nav");
})