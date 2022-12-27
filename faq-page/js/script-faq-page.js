
// здесь меняем картинки при наведение на ссылки 
$('.faq-link-to').mouseenter(function (e) {
    console.log(e)
    if ($(this).attr('href') == '#about-us') {
        $('.container-background-toogle').children().remove()
        $('.container-background-toogle').append('<div class = "faq-link-background-about-us slideDown"><div>').css('left', '100px')
    }
    if ($(this).attr('href') == '#menedgers') {
        $('.container-background-toogle').children().remove()
        $('.container-background-toogle').append('<div class = "faq-link-background-menedgers slideUp"><div>').css('left', '100px')
    }
    if ($(this).attr('href') == '#products') {
        $('.container-background-toogle').children().remove()
        $('.container-background-toogle').append('<div class = "faq-link-background-products slideDown"><div>').css('left', '100px')
    }
    if ($(this).attr('href') == '#scammers') {
        $('.container-background-toogle').children().remove()
        $('.container-background-toogle').append('<div class = "faq-link-background-scammers slideUp"><div>').css('left', '100px')
    }
})

$(window).on('scroll', trackScrollTop)
// функция  добавление класса 
function addScene(blockTo, condition) {
    setTimeout(function () {
        $(blockTo).addClass(`${condition}`)
    }, 100)
}
// отслеживает положение скролла
function trackScrollTop() {
    let scrollTop = $(window).scrollTop()
    scrollTop > 100 ? $('.header-global').css('top','-100px'):$('.header-global').css('top','0px')
}


$('.faq-link-to').bind('click', trackClickHref)
// здесь устанавливаем на параграф при клике на ссылку
function trackClickHref() {
    $(this).attr('href') == '#about-us' ? $('#about-us').css('box-shadow', ' inset 0px 0px 30px -5px rgb(255, 255, 255)') :  $('#about-us').css('box-shadow', 'inset 0px 0px 4px 0.1px black')
    $(this).attr('href') == '#menedgers' ? $('#menedgers').css('box-shadow', '  inset 0px 0px 30px -5px rgb(13, 34, 128)') : $('#menedgers').css('box-shadow', 'inset 0px 0px 4px 0.1px black')
    $(this).attr('href') == '#products' ? $('#products').css('box-shadow', 'inset 0px 0px 30px -5px rgb(224, 91, 2)') : $('#products').css('box-shadow', 'inset 0px 0px 4px 0.1px black')
    $(this).attr('href') == '#scammers' ? $('#scammers').css('box-shadow', ' inset 0px 0px 30px -5px rgb(255, 0, 0)') :  $('#scammers').css('box-shadow', 'inset 0px 0px 4px 0.1px black')
}


// функция появление попапа при клике
const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
    const buttonElem = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
`;

    const openModal = () => {
        modalElem.style.visibility = "visible";
        modalElem.style.opacity = 1;
        document.querySelector('.faq-sub-container').style.filter = "blur(4px) grayscale(50%)"
        window.addEventListener("keydown", closeModal)
    }

    const closeModal = (e) => {
        const target = e.target;
        if (target === modalElem || target.closest(btnClose) || e.code === "Escape") {
            modalElem.style.opacity = 0;
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
                document.querySelector('.faq-sub-container').style.filter = "blur(0px)"
                
            }, time);
        }
    }
    buttonElem.forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    modalElem.addEventListener("click", closeModal);
}
modalController({
    // окно которе откроется
    modal: ".faq-popup-container",
    // кнопка при нажатие которой откроется
    btnOpen: ".submit-responce-faq",
    // элемент при клике на который закроется окно 
    btnClose: ".back-popup-btn",
    time: 400
});

