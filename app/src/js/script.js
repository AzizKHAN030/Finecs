//=include components/jquery.js
//=include components/slick.js

//Navigation

const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');
burger.addEventListener("click", function () {
    this.classList.toggle("opened");
    menu.classList.toggle("opened");

    this.querySelectorAll("img")[0].classList.toggle("active");
    this.querySelectorAll("img")[1].classList.toggle("active");

})

$(".header__slider").slick({
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
});

//sidebar-close
const sidebarBtns = document.querySelectorAll('aside button');
sidebarBtns.forEach((btn)=>{
    btn.addEventListener("click",function(){
        this.parentElement.classList.toggle("closed");
    })
})

// advantages items close
const aimAdvTxt = document.querySelectorAll('.aim__advantages-item p');
const aimTxtBtns = document.querySelectorAll('.aim__advantages-item button');
aimTxtBtns.forEach((btn)=>{
    btn.addEventListener("click",function(){
        btn.previousElementSibling.classList.toggle("full");
        btn.classList.toggle("full");
        btn.classList.contains("full")?btn.innerHTML="Less <img src='images/arrows-ico.svg'>":btn.innerHTML="More <img src='images/arrows-ico.svg'>";
    })
})
