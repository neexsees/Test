const deadline = new Date('2025-12-31T23:59:59'); // дата до окончания 

//вызов элементов
const elDays = document.querySelector('.timer__days');
const elHours = document.querySelector('.timer__hours');
const elMinutes = document.querySelector('.timer__minutes');
const elSeconds = document.querySelector('.timer__seconds');


//функция, которая обновляет цифры на таймере каждую секунду
function updateTimer() {
    const now = new Date();

    //разница между дедлайном и датой сейчас
    const diff = deadline - now;
    // перевод в дни, секунды..
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); //%24 - полные дни
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    //переводим число в строку и, если число из одной цифры, то добавляем 0

    elDays.textContent = days.toString().padStart(2, "0");
    elHours.textContent = hours.toString().padStart(2, "0");
    elMinutes.textContent = minutes.toString().padStart(2, "0");
    elSeconds.textContent = seconds.toString().padStart(2, "0");
}

//обновление таймера каждую секунду
setInterval(updateTimer, 1000);
updateTimer();



//валидация на email
const input = document.querySelector('.input-wrapper input');
const button = document.querySelector('.footer__button');

let message = document.createElement('p');
message.className = 'email-message';
input.parentElement.appendChild(message);

button.addEventListener('click', function () {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (value === '') {
        showError('');
    } else if (!emailRegex.test(value)) {
        showError('Input error');
    } else {
        hideError();
    }

    function showError(text) {
        message.textContent = text;
        message.style.display = 'block';
        message.style.color = 'red';
        input.style.border = '1px solid red';
    }

    function hideError() {
        message.style.display = 'none';
        input.style.border = '';
    }
});

const deliveryTimeEl = document.querySelector('.header__delivery-time');

const deliveryStartHour = 7;
const deliveryEndHour = 23;

function updateDeliveryTime() {
    const now = new Date();

    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), deliveryStartHour, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), deliveryEndHour, 0, 0);

    const options = { hour: '2-digit', minute: '2-digit' };
    const startFormatted = startTime.toLocaleTimeString([], options);
    const endFormatted = endTime.toLocaleTimeString([], options);
    deliveryTimeEl.textContent = `${startFormatted} to ${endFormatted}`;
}

updateDeliveryTime();
setInterval(updateDeliveryTime, 60000);


function calculateNewPrice(oldPrice) {
    const discountRate = 0.1875;
    const newPrice = oldPrice * (1 - discountRate);
    return newPrice.toFixed(2); //округление до сотых
}

const oldPrice = 26.67;
const newPrice = calculateNewPrice(oldPrice);

const currentPriceElement = document.querySelector('.hero__price-current');
const oldPriceElement = document.querySelector('.hero__old-price del');

if (currentPriceElement) {
    currentPriceElement.textContent = '$' + newPrice;
}

if (oldPriceElement) {
    oldPriceElement.textContent = '$' + oldPrice;
}

//выпадающий список
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const mainLink = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('li a');

    let currentSelected = mainLink.childNodes[0].textContent.trim();
    items.forEach(item => {
        if (item.textContent.trim() === currentSelected) {
            item.parentElement.remove();
        }
    });
    menu.addEventListener('click', e => {
        const item = e.target.closest('a');
        if (!item) return;
        e.preventDefault();
        const selectedText = item.textContent.trim();
        item.parentElement.remove();
        const newLi = document.createElement('li');
        const newLink = document.createElement('a');
        newLink.href = '#';
        newLink.textContent = currentSelected;
        if (currentSelected === 'English') newLink.setAttribute('data-lang', 'en');
        else if (currentSelected === 'Русский') newLink.setAttribute('data-lang', 'ru');
        else if (currentSelected === 'Deutsch') newLink.setAttribute('data-lang', 'de');
        newLi.appendChild(newLink);
        menu.appendChild(newLi);
        mainLink.childNodes[0].textContent = selectedText + ' ';
        currentSelected = selectedText;
    });
});

// Словарь
const translations = {
    ru: {
        notification: 'БЕСПЛАТНАЯ доставка & 40% скидка на следующие 3 заказа! Оформите 1-й заказ <strong>прямо сейчас</strong>!',
        about_us: 'О нас',
        account: 'Мой профиль',
        wishlist: 'Избранное',
        deliveryText: 'Доставляем вам каждый день с <strong class="header__delivery-time">7:00 до 23:00</strong>',
        tracking: 'Доставки',
        hero_main_text: 'Покупайте у нас<br>для лучшего качества и<br>лучшей цены',
        hero_bottom_text: 'Мы подготовили для вас специальные скидки на продукты питания.<br> Не упустите эти возможности...',
        hero_bottom_text_description: 'Не пропустите это ограниченное по времени предложение.',
        fruits_vegetables: 'Фрукты и овощи',
        baby_pregnancy: 'Ребенок и беременность',
        beverages: 'Напитки',
        meats_seafood: 'Мясо и морепродукты',
        biscuits_snacks: 'Печенье и закуски',
        breads_bakery: 'Хлеб и выпеяка',
        breaksfast_dairy: 'Завтрак и молочка',
        frozen_foods: 'Замороженные продукты',
        grocery_staples: 'Продукты и основное',
        top_clue: 'Подпишитесь на рассылку и получите скидку 10£',
        under_clue: 'Зарегистрируйтесь сейчас, чтобы получать новости об акциях и купонах.<br> Не волнуйтесь, мы не рассылаем спам!',
        bottom_btn_text: 'Регистрируясь, вы соглашаетесь с <a href="#">Условиями, Политикой конфиденциальности и файлами cookie.</a>',
        information_help: ' Вам нужна помощь?',
        information_make_money: 'Зарабатывайте с нами',
        sell_grogin: 'Продавайте на Grogin',
        services_grogin: 'Продавайте свои услуги на Grogin',
        grogin_business: 'Продавайте через Grogin Business',
        apps_grogin: 'Продавайте свои приложения на Grogin',
        become_affiate: 'Станьте партнёром',
        advertise_products: 'Рекламируйте свои товары',
        sell_publish: 'Продавайте и публикуйте с нами',
        become_bolwwe_vendor: 'Станьте продавцом Blowwe',
        information_users: 'Позвольте помочь вам',
        careers_grogin: 'Карьера в Grogin',
        about_grogin: 'О Grogin',
        inverstor_relations: 'Отношения с инвесторами',
        grogin_devices: 'Устройства Grogin',
        customer_reviews: 'Отзывы клиентов',
        social_responsibility: 'Социальная ответственность',
        store_location: 'Местоположение магазинов',
        download_apps: 'Скачайте наше приложение',
        information_known: 'Узнайте о нас',
        accessibility_statement: 'Заявление о доступности',
        orders: 'Ваши заказы',
        returns_replacements: 'Возвраты и замены',
        shipping_policies: 'Тарифы и политика доставки',
        returns_policy: 'Политика возвратов и возмещений',
        privacy_policy: 'Политика конфиденциальности',
        terms_conditions: 'Условия и положения',
        cookie_settings: 'Настройки файлов cookie',
        help_center: 'Центр помощи',
        download_apps_discount: 'Скачайте приложение и получите <br>скидку',
        download_apps_discount_20: 'Скачайте приложение и получите <br>-20% скидку',
        download_apps_discount_10: 'Скачайте приложение и получите <br>-10% скидку',
        commerce: 'Авторское право 2024 © Jinstore WooCommerce WordPress Theme. Все права защищены. Разработано <a href="#">BlackRise Themes.</a>',
        social_media: 'Подписывайтесь на нас в соцсетях:',
        information_mail_help: 'Нужна помощь с вашим заказом?',
        weekend_discount: 'Скидка на выходные',
        header_home: 'Главная',
        header_shop: 'Магазин',
        header_Fruits_Vegetables: 'Фрукты и овощи',
        header_beverages: 'Напитки',
        header_blog: 'Блог',
        header_contact: 'Контакты',
        header_trending_products: 'Популярные товары',
        header_almost_finished: 'Почти закончились',
        header_search_input: 'Ищите товары, категории или бренды...',
        input_email: 'Введите свой адрес электронной почты',
        header_delivery_all: 'Доставка<br><strong>всем',
        header_sign_in: 'Войти в<br><strong>Аккаунт</strong>',
        shop_now_btn: 'Купить сейчас',
        phone_schedule: 'Пн-Пт: 08:00–21:00',
        footer_terms_conditions: '<a href="#"><u>Условия и положения</u></a>',
        footer_privacy_policy: '<a href="#"><u>Политика конфиденциальности</u></a>',
        footer_order_tracking: '<a href="#"><u>Отслеживание заказа</u></a>',
        header_timer: 'До конца акции:',
        days: 'дней',
        hours: 'часов',
        minutes: 'минут',
        seconds: 'сек.',

    },
    de: {
        notification: 'KOSTENLOSE Lieferung & 40% Rabatt auf nächste 3 Bestellungen! Platzieren Sie 1. Bestellung <strong>jetzt</strong>!',
        about_us: 'Über uns',
        account: 'Mein Konto',
        wishlist: 'Wunschliste',
        deliveryText: 'Wir liefern täglich von <strong class="header__delivery-time">7:00 bis 23:00</strong>',
        tracking: 'Auftragsverfolgung',
        hero_main_text: 'Kaufen Sie bei uns<br>für bessere Qualität und<br>den besten Preis',
        hero_bottom_text: 'Wir haben für Sie spezielle Rabatte auf Lebensmittelprodukte vorbereitet. <br>Verpassen Sie diese Gelegenheiten nicht ...',
        hero_bottom_text_description: 'Verpassen Sie dieses zeitlich begrenzte Angebot nicht.',
        fruits_vegetables: 'Obst & Gemüse',
        baby_pregnancy: 'Baby & Schwangerschaft',
        beverages: 'Getränke',
        meats_seafood: 'Fleisch & Meeresfrüchte',
        biscuits_snacks: 'Kekse & Snacks',
        breads_bakery: 'Brot & Backwaren',
        breaksfast_dairy: 'Frühstück & Milchprodukte',
        frozen_foods: 'Tiefkühlkost',
        grocery_staples: 'Lebensmittel & Basics',
        top_clue: 'Klicken Sie auf unsere Website und nutzen Sie die £10 ',
        under_clue: 'Registrieren Sie sich jetzt, um die neuesten Informationen zu Aktionen und Gutscheinen zu erhalten. Keine Sorge, wir versenden keinen Spam!',
        bottom_btn_text: 'Mit Ihrer Anmeldung stimmen Sie unseren <a href="#">Allgemeinen Geschäftsbedingungen und Datenschutz- und Cookie-Richtlinien zu.</a>',
        information_help: 'Brauchen Sie Hilfe?',
        information_make_money: 'Verdienen Sie Geld mit uns',
        sell_grogin: 'Verkaufen auf Grogin',
        services_grogin: 'Verkaufen Sie Ihre Dienstleistungen auf Grogin',
        grogin_business: 'Verkaufen über Grogin Business',
        apps_grogin: 'Verkaufen Sie Ihre Apps auf Grogin',
        become_affiate: 'Werden Sie Partner',
        advertise_products: 'Bewerben Sie Ihre Produkte',
        sell_publish: 'Verkaufen & Veröffentlichen mit uns',
        become_bolwwe_vendor: 'Werden Sie Blowwe-Verkäufer',
        information_users: 'Lassen Sie sich von uns helfen',
        careers_grogin: 'Karriere bei Grogin',
        about_grogin: 'Über Grogin',
        inverstor_relations: 'Investor Relations',
        grogin_devices: 'Grogin Geräte',
        customer_reviews: 'Kundenbewertungen',
        social_responsibility: 'Soziale Verantwortung',
        store_location: 'Geschäftsstandorte',
        download_apps: 'Laden Sie unsere App herunter',
        information_known: 'Lernen Sie uns kennen',
        accessibility_statement: 'Barrierefreiheitserklärung',
        orders: 'Ihre Bestellungen',
        returns_replacements: 'Rückgaben & Ersatz',
        shipping_policies: 'Versandkosten & Richtlinien',
        returns_policy: 'Rückerstattungs- und Rückgaberichtlinie',
        privacy_policy: 'Datenschutzrichtlinie',
        terms_conditions: 'Allgemeine Geschäftsbedingungen',
        cookie_settings: 'Cookie-Einstellungen',
        help_center: 'Hilfezentrum',
        download_apps_discount_20: 'App herunterladen und <br>-20% Rabatt erhalten',
        download_apps_discount_10: 'App herunterladen und <br>-10% Rabatt erhalten',
        commerce: 'Urheberrecht 2024 © Jinstore WooCommerce WordPress Theme. Alle Rechte vorbehalten. Entwickelt von <a href="#">BlackRise Themes.</a>',
        social_media: 'Folgen Sie uns in den sozialen Medien:',
        information_mail_help: 'Benötigen Sie Hilfe bei Ihrer Bestellung?',
        weekend_discount: 'Wochenendrabatt',
        header_home: 'Startseite',
        header_shop: 'Shop',
        header_Fruits_Vegetables: 'Obst & Gemüse',
        header_beverages: 'Getränke',
        header_blog: 'Blog',
        header_contact: 'Kontakt',
        header_trending_products: 'Trendprodukte',
        header_almost_finished: 'Fast ausverkauft',
        header_search_input: 'Suche nach Produkten, Kategorien oder Marken...',
        input_email: 'Geben Sie Ihre E-Mail-Adresse ein',
        header_delivery_all: 'An alle<br><strong> liefern',  
        header_sign_in: 'Konto <br><strong>anmelden</strong>',
        shop_now_btn: 'Jetzt einkaufen',
        phone_schedule: 'Mo–Fr: 08:00–21:00',
        footer_terms_conditions: '<a href="#"><u>Allgemeine Geschäftsbedingungen</u></a>',
        footer_privacy_policy: '<a href="#"><u>Datenschutzrichtlinie</u></a>',
        footer_order_tracking: '<a href="#"><u>Auftragsverfolgung</u></a>',
        header_timer: 'Bis zum Ende des Verkaufs:',
        days: 'Tage',
        hours: 'Stunden',
        minutes: 'Minuten',
        seconds: 'Sek.',
    },
    en: {
        notification: 'FREE delivery & 40% Discount for next 3 orders! Place your 1st order <strong>now</strong>.',
        about_us: 'About Us',
        account: 'My account',
        wishlist: 'Wishlist',
        deliveryText: 'We deliver to you every day from <strong class="header__delivery-time">7:00 to 23:00</strong>',
        tracking: 'Order Tracking',
        hero_main_text: 'Shopping with us for<br> better quality and the<br> best price',
        hero_bottom_text: 'We have prepared special discounts for you on grocery products.<br> Don`t miss these opportunities...',
        hero_bottom_text_description: 'Don`t miss this limited time offer.',
        fruits_vegetables: 'Fruits & Vegetables',
        baby_pregnancy: 'Baby & Pregnancy',
        beverages: 'Beverages',
        meats_seafood: 'Meats & Seafood',
        biscuits_snacks: 'Biscuits & Snacks',
        breads_bakery: 'Breads & Bakery',
        breaksfast_dairy: 'Breaksfast & Dairy',
        frozen_foods: 'Frozen Foods',
        grocery_staples: 'Grocery & Staples',
        top_clue: 'Join our newsletter for £10 offs',
        under_clue: 'Register now to get latest updates on promotions & coupons.Don`t worry, we not spam!',
        bottom_btn_text: 'By subscribing you agree to our <a href="#">Terms & Conditions and Privacy & Cookies Policy.</a>',
        information_make_money: 'Make Money with Us',
        information_help: 'Do You Need Help ?',
        sell_grogin: 'Sell on Grogin',
        services_grogin: 'Sell Your Services on Grogin',
        grogin_business: 'Sell on Grogin Business',
        apps_grogin: 'Sell Your Apps on Grogin',
        become_affiate: 'Become an Affilate',
        advertise_products: 'Advertise Your Products',
        sell_publish: 'Sell-Publish with Us',
        become_bolwwe_vendor: 'Become an Blowwe Vendor',
        information_users: 'Let Us Help You',
        careers_grogin: 'Careers for Grogin',
        about_grogin: 'About Grogin',
        inverstor_relations: 'Inverstor Relations',
        grogin_devices: 'Grogin Devices',
        customer_reviews: 'Customer reviews',
        social_responsibility: 'Social Responsibility',
        store_location: 'Store Locations',
        download_apps: 'Download our app',
        information_known: 'Get to Know Us',
        accessibility_statement: 'Accessibility Statement',
        orders: 'Your Orders',
        returns_replacements: 'Returns & Replacements',
        shipping_policies: 'Shipping Rates & Policies',
        returns_policy: 'Refund and Returns Policy',
        privacy_policy: 'Privacy Policy',
        terms_conditions: 'Terms and Conditions',
        cookie_settings: 'Cookie Settings',
        help_center: 'Help Center',
        download_apps_discount_20: 'Download App Get <br>-20% Discount',
        download_apps_discount_10: 'Download App Get <br>-10% Discount',
        commerce: 'Copyright 2024 © Jinstore WooCommerce WordPress Theme. All right reserved. Powered by <a href="#">BlackRise Themes.</a>',
        social_media: 'Follow us on social media:',
        information_mail_help: 'Need help with your order?',
        weekend_discount: 'Weekend Discount',
        header_home: 'Home',
        header_shop: 'Shop',
        header_Fruits_Vegetables: 'Fruits & Vegetables',
        header_beverages: 'Beverages',
        header_blog: 'Blog',
        header_contact: 'Contact',
        header_trending_products: 'Trending Products',
        header_almost_finished: 'Almost Finished',
        header_search_input: 'Search for products, categories or brands...',
        input_email: 'Enter your email address',
        header_delivery_all: 'Deliver to<br><strong> all',
        header_sign_in: 'Sign In<br><strong>Account</strong>',
        shop_now_btn: 'Shop Now',
        phone_schedule: 'Monday-Friday: 08am-9pm',
        footer_terms_conditions: '<a href="#"><u>Terms and Conditions</u></a>',
        footer_privacy_policy: '<a href="#"><u>Privacy Policy</u></a>',
        footer_order_tracking: '<a href="#"><u>Order Tracking</u></a>',
        header_timer: 'Until the end of the sale:',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'sec.',

    },
};

const notifText = document.querySelector('[data-i18n="notification_text"]');
const aboutLink = document.querySelector('[data-i18n="header__text__About"] a');
const accountLink = document.querySelector('[data-i18n="header__text__Account"] a');
const wishlistLink = document.querySelector('[data-i18n="header__text__Wishlist"] a');
const deliveryEl = document.querySelector('[data-i18n="header__text__delivery"]');
const trackingLink = document.querySelector('[data-i18n="header__text__Tracking"] a');
const heroMainTextLink = document.querySelector('[data-i18n="hero__main__text"]');
const heroBottomTextLink = document.querySelector('[data-i18n="hero__bottom__text"]');
const heroBottomTextDescriptionLink = document.querySelector('[data-i18n="hero__bottom-text-description"]');

const fruitsAndVegetablesLink = document.querySelector('[data-i18n="categories_fruits_vegetables"]');
const babyPregnancyLink = document.querySelector('[data-i18n="categories_baby_pregnancy"]');
const beveragesLink = document.querySelector('[data-i18n="categories_beverages"]');
const meatsSeafoodLink = document.querySelector('[data-i18n="categories_meats_seafood"]');
const biscuitsSnacksLink = document.querySelector('[data-i18n="categories_biscuits_snacks"]');
const breadsBakeryLink = document.querySelector('[data-i18n="categories_breads_bakery"]');
const breaksfastDairyLink = document.querySelector('[data-i18n="categories_breaksfast_dairy"]');
const frozenFoodsLink = document.querySelector('[data-i18n="categories_frozen_foods"]');
const groceryStaplesLink = document.querySelector('[data-i18n="categories_grocery_staples"]');

const topClueLink = document.querySelector('[data-i18n="footer__top__clue"]');
const underClueLink = document.querySelector('[data-i18n="footer__under__clue"]');
const bottomBtnTextLink = document.querySelector('[data-i18n="footer__bottom-btn-text"]');


const informationHelpTextLink = document.querySelector('[data-i18n="information__help"]');
const informationPhoneScheduleLink = document.querySelector('[data-i18n="information__phone-schedule"]');

const informationMakeMoneyLink = document.querySelector('[data-i18n="information__make-money"]');

const sellGrogonLink = document.querySelector('[data-i18n="sell-grogin"] a');
const servicesGroginLink = document.querySelector('[data-i18n="services-grogin"] a');
const groginBusinessLink = document.querySelector('[data-i18n="grogin-business"] a');
const appsGroginLink = document.querySelector('[data-i18n="apps-grogin"] a');
const becomeAffilateLink = document.querySelector('[data-i18n="become-affilate"] a');
const advertiseProductsLink = document.querySelector('[data-i18n="advertise-products"] a');
const sellPublishLink = document.querySelector('[data-i18n="sell-publish"] a');
const becomeBlowweVendorLink = document.querySelector('[data-i18n="become-blowwe-vendor"] a');
const informationHeadingLink = document.querySelector('[data-i18n="information__heading"] a');

const informationUsersLink = document.querySelector('[data-i18n="information__users"]');
const careersGroginLink = document.querySelector('[data-i18n="careers__grogin"] a');
const aboutGroginLink= document.querySelector('[data-i18n="about__grogin"] a');
const investorRelationsLink= document.querySelector('[data-i18n="inverstor__relations"] a');
const groginDevicesLink = document.querySelector('[data-i18n="grogin__devices"] a');
const customerRewiewsLink= document.querySelector('[data-i18n="customer__reviews"] a');
const socialResponcibilityLink= document.querySelector('[data-i18n="social__responsibility"] a');
const storeLocationLink = document.querySelector('[data-i18n="store__location"] a');

const donwnloadAppsLink = document.querySelector('[data-i18n="download__apps"]');
const informationKnownLink = document.querySelector('[data-i18n="information__know"]');
const accessibilityStatementLink = document.querySelector('[data-i18n="accessibility__statement"] a');
const ordersLink = document.querySelector('[data-i18n="orders"] a');
const returnsReplacementsLink = document.querySelector('[data-i18n="returns__replacements"] a');
const shippingPoliciesLink = document.querySelector('[data-i18n="shipping__policies"] a');
const returnsPolicyLink = document.querySelector('[data-i18n="returns__policy"] a');
const privacyPolicyLink = document.querySelector('[data-i18n="privacy__policy"] a');
const termsConditionsLink = document.querySelector('[data-i18n="terms__conditions"] a');
const cookieSettingsLink = document.querySelector('[data-i18n="cookie__settings"] a');
const helpCenterLink = document.querySelector('[data-i18n="help__center"] a');
const downloadAppaDiscountLink20 = document.querySelector('[data-i18n="download__apps__discount__20"]');
const downloadAppaDiscountLink10 = document.querySelector('[data-i18n="download__apps__discount__10"]');
const commerceLink = document.querySelector('[data-i18n="commerce"]');
const socailMediaLink = document.querySelector('[data-i18n="social__media"]');
const informationMailHelpLink = document.querySelector('[data-i18n="information__mail-help"]');
const weekendDiscountLink = document.querySelector('[data-i18n="weekend__discount"]');
const headerHomeLink = document.querySelector('[data-i18n="header__home"] a');
const headerShopLink = document.querySelector('[data-i18n="header__shop"] a');
const headerFruitsVegetablesLink = document.querySelector('[data-i18n="header__fruits-vegetables"] a');
const headerBeveragesLink = document.querySelector('[data-i18n="header__beverages"] a');
const headerBlogLink = document.querySelector('[data-i18n="header__blog"] a');
const headerContactLink = document.querySelector('[data-i18n="header__contact"] a');
const headerTrendingProductsLink = document.querySelector('[data-i18n="header__trending__products"] a');
const headerAlmostFinishedLink =  document.querySelector('[data-i18n="header__almost__finished"] a');
const headerSearchInputLink =  document.querySelector('[data-i18n="header__search__input"]');
const inputEmailLink =  document.querySelector('[data-i18n="input__email"]');
const headerDeliveryAllLink =  document.querySelector('[data-i18n="header__delivery-all"]');
const headerSignInLink =  document.querySelector('[data-i18n="header__sign-in"]');
const shopNowBtnLink =  document.querySelector('[data-i18n="shop-now__btn"]');
const footerTermsConditionsLink =  document.querySelector('[data-i18n="footer__terms-conditions"] a');
const footerPrivacyPolicyLink =  document.querySelector('[data-i18n="footer__privacy-policy"] a');
const footerOrderTrackingLink =  document.querySelector('[data-i18n="footer__order-tracking"] a');
const headerTimerLink =  document.querySelector('[data-i18n="header__timer"]');
const daysUnit = document.querySelector('[data-i18n="days"]');
const hoursUnit = document.querySelector('[data-i18n="hours"]');
const minutesUnit = document.querySelector('[data-i18n="minutes"]');
const secondsUnit = document.querySelector('[data-i18n="seconds"]');


document.addEventListener('click', e => {
    const langBtn = e.target.closest('[data-lang]');
    if (!langBtn) return;
    e.preventDefault();

    const lang = langBtn.getAttribute('data-lang');
    if (translations[lang]) {
        notifText.innerHTML = translations[lang].notification;
        if (aboutLink) aboutLink.textContent = translations[lang].about_us;
        if (accountLink) accountLink.textContent = translations[lang].account;
        if (wishlistLink) wishlistLink.textContent = translations[lang].wishlist;
        if (deliveryEl) deliveryEl.innerHTML = translations[lang].deliveryText;
        if (trackingLink) trackingLink.textContent = translations[lang].tracking;
        if (heroMainTextLink) heroMainTextLink.innerHTML = translations[lang].hero_main_text;
        if (heroBottomTextLink) heroBottomTextLink.innerHTML = translations[lang].hero_bottom_text;
        if (heroBottomTextDescriptionLink) heroBottomTextDescriptionLink.innerHTML = translations[lang].hero_bottom_text_description;

        if (fruitsAndVegetablesLink) fruitsAndVegetablesLink.textContent = translations[lang].fruits_vegetables;
        if (babyPregnancyLink) babyPregnancyLink.textContent = translations[lang].baby_pregnancy;
        if (beveragesLink) beveragesLink.textContent = translations[lang].beverages;
        if (meatsSeafoodLink) meatsSeafoodLink.textContent = translations[lang].meats_seafood;
        if (biscuitsSnacksLink) biscuitsSnacksLink.textContent = translations[lang].biscuits_snacks;
        if (breadsBakeryLink) breadsBakeryLink.textContent = translations[lang].breads_bakery;
        if (breaksfastDairyLink) breaksfastDairyLink.textContent = translations[lang].breaksfast_dairy;
        if (frozenFoodsLink) frozenFoodsLink.textContent = translations[lang].frozen_foods;
        if (groceryStaplesLink) groceryStaplesLink.textContent = translations[lang].grocery_staples;
        if (topClueLink) topClueLink.innerHTML = translations[lang].top_clue;
        if (underClueLink) underClueLink.innerHTML = translations[lang].under_clue;
        if (bottomBtnTextLink) bottomBtnTextLink.innerHTML = translations[lang].bottom_btn_text;

        if (informationHelpTextLink) informationHelpTextLink.innerHTML = translations[lang].information_help;
        if (informationMakeMoneyLink)informationMakeMoneyLink.innerHTML = translations[lang].information_make_money;
        if (sellGrogonLink)sellGrogonLink.textContent = translations[lang].sell_grogin;
        if (servicesGroginLink)servicesGroginLink.textContent = translations[lang].services_grogin;
        if (groginBusinessLink)groginBusinessLink.textContent = translations[lang].grogin_business;
        if (appsGroginLink)appsGroginLink.textContent = translations[lang].apps_grogin;
        if (becomeAffilateLink) becomeAffilateLink.textContent = translations[lang].become_affiate;
        if (advertiseProductsLink)advertiseProductsLink.textContent = translations[lang].advertise_products;
        if (sellPublishLink)sellPublishLink.textContent = translations[lang].sell_publish;
        if (becomeBlowweVendorLink)becomeBlowweVendorLink.textContent = translations[lang].become_bolwwe_vendor;
        if (informationUsersLink)informationUsersLink.innerHTML = translations[lang].information_users;
        if (careersGroginLink)careersGroginLink.textContent = translations[lang].careers_grogin;
        if (aboutGroginLink)aboutGroginLink.textContent = translations[lang].about_grogin;
        if (investorRelationsLink)investorRelationsLink.textContent = translations[lang].inverstor_relations;
        if (customerRewiewsLink)customerRewiewsLink.textContent = translations[lang].customer_reviews;
        if (socialResponcibilityLink)socialResponcibilityLink.textContent = translations[lang].social_responsibility;
        if (storeLocationLink)storeLocationLink.textContent = translations[lang].store_location;
        if (groginDevicesLink)groginDevicesLink.textContent = translations[lang].grogin_devices;

        if (donwnloadAppsLink)donwnloadAppsLink.innerHTML = translations[lang].download_apps;
        if (informationKnownLink)informationKnownLink.innerHTML = translations[lang].information_known;
        if (accessibilityStatementLink)accessibilityStatementLink.textContent = translations[lang].accessibility_statement;
        if (ordersLink)ordersLink.textContent = translations[lang].orders;
        if (returnsReplacementsLink)returnsReplacementsLink.textContent = translations[lang].returns__replacements;
        if (shippingPoliciesLink)shippingPoliciesLink.textContent = translations[lang].shipping_policies;
        if (returnsPolicyLink)returnsPolicyLink.textContent = translations[lang].returns_policy;
        if (privacyPolicyLink)privacyPolicyLink.textContent = translations[lang].privacy_policy;
        if (termsConditionsLink)termsConditionsLink.textContent = translations[lang].terms_conditions;
        if (cookieSettingsLink)cookieSettingsLink.textContent = translations[lang].cookie_settings;
        if (helpCenterLink)helpCenterLink.textContent = translations[lang].help_center;
        if (downloadAppaDiscountLink10)downloadAppaDiscountLink10.innerHTML = translations[lang].download_apps_discount_10;
        if (downloadAppaDiscountLink20)downloadAppaDiscountLink20.innerHTML = translations[lang].download_apps_discount_20;
        if (commerceLink)commerceLink.innerHTML = translations[lang].commerce;
        if (socailMediaLink)socailMediaLink.innerHTML = translations[lang].social_media;
        if (informationMailHelpLink)informationMailHelpLink.innerHTML = translations[lang].information_mail_help;
        if (weekendDiscountLink)weekendDiscountLink.innerHTML = translations[lang].weekend_discount;
        if (headerHomeLink) headerHomeLink.childNodes[0].textContent = translations[lang].header_home + ' ';
        if (headerShopLink) headerShopLink.childNodes[0].textContent = translations[lang].header_shop + ' ';
        if (headerFruitsVegetablesLink)headerFruitsVegetablesLink.textContent = translations[lang].header_Fruits_Vegetables;
        if (headerBeveragesLink)headerBeveragesLink.textContent = translations[lang].header_beverages;
        if (headerBlogLink)headerBlogLink.textContent = translations[lang].header_blog;
        if (headerContactLink)headerContactLink.textContent = translations[lang].header_contact;
        if (headerTrendingProductsLink) headerTrendingProductsLink.childNodes[0].textContent = translations[lang].header_trending_products + ' ';
        if (headerAlmostFinishedLink)headerAlmostFinishedLink.childNodes[0].textContent = translations[lang].header_almost_finished + ' ';
        if (headerSearchInputLink) headerSearchInputLink.placeholder = translations[lang].header_search_input;
        if (inputEmailLink)inputEmailLink.placeholder = translations[lang].input_email;

        if (headerDeliveryAllLink)headerDeliveryAllLink.innerHTML = translations[lang].header_delivery_all;
        if (headerSignInLink)headerSignInLink.innerHTML = translations[lang].header_sign_in;

        if (shopNowBtnLink) shopNowBtnLink.textContent = translations[lang].shop_now_btn;
        if (informationPhoneScheduleLink)informationPhoneScheduleLink.innerHTML = translations[lang].phone_schedule;

        if (footerTermsConditionsLink) footerTermsConditionsLink.innerHTML = translations[lang].footer_terms_conditions;
        if (footerPrivacyPolicyLink) footerPrivacyPolicyLink.innerHTML = translations[lang].footer_privacy_policy;
        if (footerOrderTrackingLink) footerOrderTrackingLink.innerHTML = translations[lang].footer_order_tracking;
        if (headerTimerLink) headerTimerLink.textContent = translations[lang].header_timer;
        if (daysUnit) daysUnit.textContent = translations[lang].days;
        if (hoursUnit) hoursUnit.textContent = translations[lang].hours;
        if (minutesUnit) minutesUnit.textContent = translations[lang].minutes;
        if (secondsUnit) secondsUnit.textContent = translations[lang].seconds;
        
    }
});


