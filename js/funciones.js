(function() {

    const btn_menu = document.getElementById('btn_menu');
    const toggleNavbar = () => {
        if ($('#aside').hasClass('aside-hidden')) {
            $('#aside').removeClass('aside-hidden');
            $('#main').removeClass('main-complete');
        } else {
            $('#aside').addClass('aside-hidden');
            $('#main').addClass('main-complete');
        }
    }

    btn_menu.addEventListener('click', toggleNavbar);
})();
