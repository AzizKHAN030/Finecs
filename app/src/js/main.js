//Navigation

const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');
burger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("active");
    this.classList.contains("active") ? document.querySelector('body').style = "overflow-y:hidden;touch-action: none;-ms-touch-action: none;" : document.querySelector('body').style = "";
})

//TRANSLATE
// =include ../lang/lang.js       

const langBtns = document.querySelectorAll('.nav__menu-lang a');
console.log(langBtns);
const langs = ["eng", "ru", "uzb"];
if (langBtns) {
    langBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            setLang(e);
            changeLang();
        });
    });

    function setLang(e) {
        localStorage.setItem("lang", e.target.attributes.value.nodeValue);
    }

    function changeLang() {
        let getLang = localStorage.getItem("lang");
        if (!getLang) {
            getLang = "eng";
        }
        langBtns.forEach((btn) => {
            btn.classList.remove("active");
            if (btn.getAttribute("value") == getLang) {
                btn.classList.add("active");
            }
        })
        for (let key in langArr) {
             if(key.includes("aimItem-title")||key.includes("aimItem-text") || key.includes("authors-subtitle") || key.includes("issueTab-btn")|| key.includes("issueTab-title")||key.includes("issueItem-title")||key.includes("issueItem-author")||key.includes("submission-label")){
                document.querySelectorAll(`.lng-${key}`).forEach((el,index,arr)=>{
                    if (arr.length == langArr[key].length) {
                        el.innerHTML = langArr[key][index][getLang];
                    }
                });
            }
            else if(document.querySelectorAll(`.lng-${key}`).length>1){
                const elems = document.querySelectorAll(`.lng-${key}`);
                elems.forEach(el=>{
                    el.textContent = langArr[key][getLang];
                })  
            }
            else {
                const elem = document.querySelector(`.lng-${key}`);
                if (elem) {
                    elem.innerHTML = langArr[key][getLang];
                }
            }
        }
    }

    window.addEventListener("load", function () {
        changeLang();   
    })
}

// Slider
$(".header__slider").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000000,
});


//sidebar-close
const sidebarBtns = document.querySelectorAll('aside button');
sidebarBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        this.parentElement.classList.toggle("closed");
    })
})

// advantages items close
const aimAdvTxt = document.querySelectorAll('.aim__advantages-item p');
aimAdvTxt.forEach((el)=>{
    if(el.clientHeight>120){
        el.style.maxHeight='120px';
        el.parentElement.insertAdjacentHTML('beforeend','<button><img src="images/arrows-ico.svg" alt=""></button>')
    }
})
const aimTxtBtns = document.querySelectorAll('.aim__advantages-item button');
console.log(aimTxtBtns);
aimTxtBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        btn.classList.toggle("full");
        if( btn.classList.contains("full")){
            btn.previousElementSibling.style.maxHeight=  btn.previousElementSibling.scrollHeight+'px';  
        }else{
            btn.previousElementSibling.style.maxHeight= '120px'
        }
    })
})

console.log(aimAdvTxt[2].clientHeight);

//accordeon

const accBtns = document.querySelectorAll('.editorial__accordeon-btn');
const activeBtn = document.querySelector('.editorial__accordeon-btn.active');
if (activeBtn) {
    activeBtn.nextElementSibling.style.height = activeBtn.nextElementSibling.scrollHeight + "px";
}
accBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        const height = this.nextElementSibling.scrollHeight + "px";
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
        this.nextElementSibling.classList.contains("active") ? this.nextElementSibling.style.height = height : this.nextElementSibling.style.height = 0;
    })
})


// TABS

const tabsBtns = document.querySelectorAll('.issues__tab-title button');
const tabsItems = document.querySelectorAll('.issues__tab-item');
tabsBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        for (let i = 0; i < tabsBtns.length; i++) {
            tabsBtns[i].classList.remove("active");
            tabsItems[i].classList.remove("active");
        }
        this.classList.add("active");
        tabsItems[this.getAttribute("data-index")].classList.add("active");
    })
})


//Submission form

// Submit file-btn

const actualBtn = document.querySelector('#file');
const fileChosen = document.querySelector('.chosen-file');
if (fileChosen) {
    actualBtn.addEventListener('change', function () {
        fileChosen.textContent = this.files[0].name;
    })
    const fileResetBtn = document.querySelector('.file-reset');
    fileResetBtn.addEventListener("click", function (e) {
        actualBtn.form.reset();
        fileChosen.textContent = "No file chosen";
    })
}


const submissionForm = document.querySelector('.submission__form');
if (submissionForm) {
    submissionForm.addEventListener("submit", function (event) {
        event.stopPropagation();
        event.preventDefault();

        let form = this,
            submit = $('.submit', form),
            data = new FormData(),
            files = $('input[type=file]')


        $('.submit', form).val('Отправка...');
        $('input, textarea', form).attr('disabled', '');

        data.append('name', $('[name="name"]', form).val());
        data.append('email', $('[name="email"]', form).val());
        data.append('text', $('[name="text"]', form).val());
        data.append('file', $('[name="file"]', form).val());

        files.each(function (key, file) {
            let cont = file.files;
            if (cont) {
                $.each(cont, function (key, value) {
                    data.append(key, value);
                });
            }
        });

        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            xhr: function () {
                let myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            let percentage = (e.loaded / e.total) * 100;
                            percentage = percentage.toFixed(0);
                            $('.submit', form)
                                .html(percentage + '%');
                        }
                    }, false);
                }
                return myXhr;
            },
            error: function (jqXHR, textStatus) {
                // Тут выводим ошибку
            },
            complete: function () {
                document.querySelector('.submission__form').classList.add("sent");
                setTimeout(() => {
                    document.querySelector('.submission__form').classList.remove("sent");
                }, 4000);
                form.reset()
            }
        });
        return false;
    });
}