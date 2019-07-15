document.addEventListener('DOMContentLoaded', ready);

function ready() {
    /*====== variables ======*/

    var productCard = $('.js-product-card');
    var productWrap = $('.product-single-wrap').eq(0);
    var productOverlay = $('.js-product-single-overlay');
    var productCloseBtn = $('.js-product-close-btn');


    /*====== events ======*/

    productCard.on('click', openProductPopup);
    productOverlay.on('click', closeProductPopup);
    productCloseBtn.on('click', closeProductPopup);


    /*====== functions ======*/

    function openProductPopup(event) {
        var cardData = getProductPopupData(event.currentTarget);

        setProductPopupData(cardData);
        productWrap.addClass('product-single-wrap--open');
    }

    function closeProductPopup() {
        productWrap.removeClass('product-single-wrap--open');
    }

    function getProductPopupData(card) {
        var cardParent = $(card).parents('.js-product').eq(0);

        return {
            'name': cardParent.data('name'),
            'oldPrice': cardParent.data('old-price'),
            'id': cardParent.data('item-id'),
            'title': $(card).find('.js-product__heading').text(),
            'image': cardParent.data('src'),
            'weight': cardParent.data('weight'),
            'price': cardParent.data('price'),
            'kcal': cardParent.data('kcal'),
            'protein': cardParent.data('protein'),
            'fats': cardParent.data('fats'),
            'carbs': cardParent.data('carbs')
        }
    }

    function setProductPopupData(cardData) {
        productWrap.find('.js-product').data('name', cardData.name);
        productWrap.find('.js-product').data('price', cardData.price);
        productWrap.find('.js-product').data('old-price', cardData.oldPrice);
        productWrap.find('.js-product').data('item-id', cardData.id);
        productWrap.find('.js-product__image').attr('src', cardData.image);
        productWrap.find('.js-product__heading').text(cardData.title);
        productWrap.find('.js-product__weight').text(cardData.weight);
        productWrap.find('.js-product__price').text(cardData.price);
        productWrap.find('.js-product__price-old').text(cardData.oldPrice + ' ₽');
        productWrap.find('.js-product__kcal').text(cardData.kcal);
        productWrap.find('.js-product__protein').text(cardData.protein);
        productWrap.find('.js-product__fats').text(cardData.fats);
        productWrap.find('.js-product__carbs').text(cardData.carbs);
    }
}