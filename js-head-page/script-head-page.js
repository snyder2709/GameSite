$(window).ready(function () {
    $('.authorize-btn').mouseenter(function () {
        $('.text-authorize').css('box-shadow', 'none')
        $('.authorize-btn').css('background-color', '#717171')
        $('.authorize-btn').mouseleave(function () {
            $('.text-authorize').css('box-shadow', 'inset 0px 0px 2.4px 2.1px  #191919')
            $('.authorize-btn').css('background-color', '#191919')
        })
    })

    const sceneBackgroundHeadPage = {
        backgroundUrl: [
            'https://cdn.windowsreport.com/wp-content/uploads/2022/04/Dying-Light-2-Stay-Human-1.jpg',
            'https://cdn.akamai.steamstatic.com/steam/apps/1182900/capsule_616x353.jpg?t=1669642969',
            ' https://i.gadgets360cdn.com/large/saints_row_need_to_know_cover_1661010692065.jpg',
            ' https://cdn1.epicgames.com/salesEvent/salesEvent/EN_R6E_STD_EPIC_Store%20Landscape_2560x1440_UK_2560x1440-b7c3e5d9f7443f7f4a33a6b5d128a832',
            ' https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwii/MWII-RELEASE-TOUT.jpg',
            ' https://cdn.cloudflare.steamstatic.com/steam/apps/1332010/header.jpg',
            ' https://cdn.akamai.steamstatic.com/steam/apps/1475810/header.jpg?t=1666909528',
            ' https://virtus-img.cdnvideo.ru/images/game-card/plain/dc/dcb14ba0-0bda-46da-8c25-86004ff53f48.jpg@jpg',
            ' https://store-images.s-microsoft.com/image/apps.21966.14329012547000484.7cb39222-264a-4c98-a0f1-007c4e95f1e1.664b113d-5f5a-43fe-9c1e-a1fa8a1915c1?mode=scale&q=90&h=1080&w=1920',
            ' https://stevivor.com/wp-content/uploads/2022/02/horizon-forbidden-west.jpg',
            ' https://s0.rbk.ru/v6_top_pics/media/img/7/68/756583852537687.jpg',
            ' https://cdn.cloudflare.steamstatic.com/steam/apps/1097350/capsule_616x353.jpg?t=1669226440',
            ' https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/capsule_616x353.jpg?t=1669338735',
            ' https://cdn.akamai.steamstatic.com/steam/apps/860510/header.jpg?t=1661866261',
            ' https://cdn.igromania.ru/mnt/games/b/1/3/8/b/9/381700/f4ca270d5cb79d5c_1200xH.jpg',
            'https://cdn.akamai.steamstatic.com/steam/apps/1182900/capsule_616x353.jpg?t=1669642969',
        ]
    }

    let posters = document.querySelectorAll('.head-page-scene-poster')
    for (let i = 0; i < sceneBackgroundHeadPage.backgroundUrl.length; i++) {
        posters[i].style.backgroundImage = `url(${sceneBackgroundHeadPage.backgroundUrl[i]})`
    }




    // слайдер здесь
    const images = document.querySelectorAll('.slider .slider-line .banner-slider');
    const sliderLine = document.querySelector('.slider .slider-line');
    const banner = document.querySelector('.slider');
    let count = 0;
    let width;

    function init() {
        width = document.querySelector('.slider').offsetWidth;
        sliderLine.style.width = width * images.length + 'px';
        images.forEach(item => {
            item.style.width = width + 'px';
            item.style.height = 100 + '%';
        });
        rollSlider();
    }

    function slideTimeOut() {
        let timeOut =  setInterval(() => {
            count++;
            if (count >= images.length) {
                count = 0;
            }
            rollSlider()
        }, 3000)
        banner.addEventListener( "mouseenter",function (e) {
            e.stopPropagation()
            clearTimeout(timeOut)
        })
        
    }
    slideTimeOut()
    init();
    window.addEventListener('resize', init);

    document.querySelector('.slider-next').addEventListener('click', function () {
        count++;
        if (count >= images.length) {
            count = 0;
        }
        rollSlider();
    });

    document.querySelector('.slider-prev').addEventListener('click', function () {
        count--;
        if (count < 0) {
            count = images.length - 1;
        }
        rollSlider();
    });

    function rollSlider() {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    }


    // обьект превью для слайдера 
    const topGame = [
        {
            title: 'Saints Row',
            description: 'Welcome to Santo Ileso, a vibrant fictional city in the American Southwest. In a world rife with crime, a group of young friends embark on their own criminal venture, as they rise to the top in their bid to become Self Made.',
            headImg: 'https://i.gadgets360cdn.com/large/saints_row_need_to_know_cover_1661010692065.jpg',
            screenshots: [
                'https://cdn2.unrealengine.com/egs-saintsrow-deepsilvervolition-g1a-01-1920x1080-4d66e9941e02.jpg',
                'https://i.playground.ru/i/screenshot/147241/saints_row_5.jpg',
                'https://i.playground.ru/i/screenshot/166198/saints_row_2022.jpg',
                'https://zobra.ru/uploads/games/p16998/saints-row-2022-Panteros-Confrontation.jpg',
            ]
        },
    ]
    let screenshot = document.querySelector('.bottom-secondary-inset').children
    let title = document.querySelector('.top-secondary-inset').children


    let topGameScreenshot = topGame.map((elem) => {
        return elem.screenshots
    })


    screenshot[1].style.backgroundImage = `url(${topGameScreenshot[0][0]})`
    screenshot[2].style.backgroundImage = `url(${topGameScreenshot[0][1]})`
    screenshot[3].style.backgroundImage = `url(${topGameScreenshot[0][2]})`
    screenshot[4].style.backgroundImage = `url(${topGameScreenshot[0][3]})`

    let headBanner = document.querySelector('.head-inset-banner')
    headBanner.style.backgroundImage = `url(${topGame[0].headImg})`
    title[1].textContent = `${topGame[0].title}`
    title[2].textContent = `${topGame[0].description}`

    // наведение на скриншоты 
    // $('.srceenshot-banner').mouseenter(function(){
    //   $(this).css('background','black')

    // })
    $('.screenshot-banner').mouseenter(function () {
        let headBanner = $(this).parents('.banner-slider').children()[0]
        let prevBackgorund = headBanner.style.backgroundImage
        let newHeadBackground = $(this).css('background-image')
        $(this).parents('.banner-slider').children()[0].style.backgroundImage = `${newHeadBackground}`
        $('.screenshot-banner').mouseleave(function () {
            headBanner.style.backgroundImage = `${prevBackgorund}`
        })
    })

})









// // форма валидация 
// const container = document.querySelector(".container"),
//     pwShowHide = document.querySelectorAll(".showHidePw"),
//     pwFields = document.querySelectorAll(".password"),
//     signup = document.querySelector(".signup-link"),
//     login = document.querySelector(".login-link");

// //   js code to show/hide password and change icon
// pwShowHide.forEach(eyeIcon => {
//     eyeIcon.addEventListener("click", () => {
//         pwFields.forEach(pwField => {
//             if (pwField.type === "password") {
//                 pwField.type = "text";

//                 pwShowHide.forEach(icon => {
//                     icon.classList.replace("uil-eye-slash", "uil-eye");
//                 })
//             } else {
//                 pwField.type = "password";

//                 pwShowHide.forEach(icon => {
//                     icon.classList.replace("uil-eye", "uil-eye-slash");
//                 })
//             }
//         })
//     })
// })





// // Функции для переключения форм
// signup.addEventListener("click", () => {
//     container.classList.add("active");
// });
// login.addEventListener("click", () => {
//     container.classList.remove("active");
// });

// /*------------------------------------------ */

// /*Функция для открытия формы в виде модального окна*/
// const modalController = ({ blackoutBackground, btnOpen, btnClose, time }) => {
//     const buttonElem = document.querySelectorAll(btnOpen);
//     const modalElem = document.querySelector(blackoutBackground);

//     modalElem.style.cssText = `
//         display: flex;
//         visibility: hidden;
//         opacity: 0;
//         transition: opacity ${time}ms ease-in-out;
//     `;

//     const openModal = () => {
//         modalElem.style.visibility = "visible";
//         modalElem.style.opacity = 1;
//         window.addEventListener("keydown", closeModal)
//     }

//     const closeModal = (e) => {
//         const target = e.target;
//         if (target === modalElem || target.closest(btnClose) || e.code === "Escape") {
//             modalElem.style.opacity = 0;
//             setTimeout(() => {
//                 modalElem.style.visibility = 'hidden';
//             }, time);
//         }
//     }

//     buttonElem.forEach(btn => {
//         btn.addEventListener("click", openModal);
//     });

//     modalElem.addEventListener("click", closeModal);
// }

// modalController({
//     blackoutBackground: ".container-head-page",
//     btnOpen: ".open-form-button",
//     btnClose: ".modal-close",
//     time: 1000
// });

// const form = document.querySelector("form");
// eField = form.querySelector(".email"),
//     eInput = eField.querySelector("input"),
//     pField = form.querySelector(".password"),
//     pInput = pField.querySelector("input");

// form.onsubmit = (e) => {
//     e.preventDefault();
//     //если адрес электронной почты и пароль пусты, добавляется в него класс встряхивания, иначе вызывается указанная функция
//     (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
//     (pInput.value == "") ? pField.classList.add("shake", "error") : checkPassword();

//     setTimeout(() => { //удаляется класс встряхивания через 500 мс
//         eField.classList.remove("shake");
//         pField.classList.remove("shake");
//     }, 500);

//     eInput.onkeyup = () => { checkEmail(); } //вызов функции checkEmail при вводе электронной почты
//     pInput.onkeyup = () => { checkPassword(); } //вызов функции checkPassword при вводе пароля

//     function checkEmail() { //функция проверки электронной почты
//         let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // шаблон для проверки электронной почты
//         if (!eInput.value.match(pattern)) { //если шаблон не совпал, то добавляем ошибку и удаляем допустимый класс
//             eField.classList.add("error");
//             eField.classList.remove("valid");
//             let errorTxt = eField.querySelector(".error-txt");
//             //если значение электронной почты не пусто, то показывается сообщение: "Введите действительный адрес электронной почты". Иначе показать сообщение: "Адрес электронной почты не может быть пустым"
//             (eInput.value != "") ? errorTxt.innerText = "Неккоректный адрес" : errorTxt.innerText = "Заполните email";
//         } else { //если шаблон совпал, то удаляем ошибку и добавляем допустимый класс
//             eField.classList.remove("error");
//             eField.classList.add("valid");
//         }
//     }

//     function checkPassword() { //функция проверки пароля
//         if (pInput.value == "" || pInput.value.length < 12) { //если поле с паролем пустое, то добавляем ошибку и удаляем допустимый класс
//             pField.classList.add("error");
//             let errorTxt = pField.querySelector(".error-txt");
//             (pInput.value != "") ? errorTxt.innerText = "Пароль не надёжный" : errorTxt.innerText = "Заполните пароль"
//             pField.classList.remove("valid");
//         } else { //если поле с паролем не пустое, то удаляем ошибку и добавляем допустимый класс
//             pField.classList.remove("error");
//             pField.classList.add("valid");
//         }
//     }
// }


// добавление в корзину
let id = 0
function saveLocal(data) {
    id++
    localStorage.setItem('shopping' + id, JSON.stringify(data))

}
function log(data) {

}


// наведение на каталог 
$('.nav-popup').mouseenter(function(){
    $('.nav-popup').append(`
    <div class = "popup-category">
    <ul>
    <li>Экшен</li>
    <li>Инди</li>
    <li>Приключения</li>
    <li>Стратегия</li>
    <li>Ролевая игра</li>
    <li>Гонки</li>
    <li>MMO</li>
    <li>Файтинг</li>
    <li>Казуальная игра</li>
    <li>DLC</li>
    </ul>
    </div>`)
    $('.nav-popup').mouseleave(function(){
        $('.nav-popup').children()[1].remove()
      
    })
})

// let key = '17865F00A285491C7891FB5A080F71B9'
// let URL_MARKET = `https://partner.steam-api.com/IEconMarketService/GetPopular/v1/&key=${key}&format=xml`
// $.get(URL_MARKET,function(res){
//     console.log(res)
// })
// let URL_IMG = 'https://api.steamapis.com/image/items/730'
// // $.get(URL_IMG,function(res){
// //     console.log(res)
// // })






// функционал для второго слайдера
function getGameList(){
    $('.nav-game-href')[0].classList.add('nav-game-href-active');
    let listGameCard = $('.list-game-card');
$('.nav-game-href').on("click",function(){
    $('.list-game-card').removeClass('active-card')
    listGameCard[($(this).attr('data-list-game'))].classList.add('active-card')
    if($('.nav-game-href').hasClass('nav-game-href-active')){
        $('.nav-game-href').removeClass('nav-game-href-active');
    }
    $(this).addClass('nav-game-href-active')

})
}


let listGameCard2 = document.querySelectorAll('.list-game-card')[1]
let child = listGameCard2.children
for (let i = 0; i < child.length; i++) {
    child[i].children[0].style.backgroundImage = "url(https://cdn.windowsreport.com/wp-content/uploads/2022/04/Dying-Light-2-Stay-Human-1.jpg)"
    
}

getGameList()

