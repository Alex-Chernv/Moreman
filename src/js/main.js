document.addEventListener('DOMContentLoaded', ready);

function ready() {
    /*====== variables ======*/

    var productCard = $('.js-product-card');
    var productWrap = $('.product-single-wrap').eq(0);
    var productOverlay = $('.js-product-single-overlay');
    var productCloseBtn = $('.js-product-close-btn');
    var profileAddressBtnEdit = $('.js-profile-address-btn-edit');
    var profileEditForm = $('.js-profile-edit-form');
    var profileEdiFormBtnClose = $('.js-profile-edit-form-btn-close');
    var profileModal = $('.js-profile-modal-wrap');
    var profileModalOverlay = $('.js-profile-modal-overlay');
    var profileModalBtnClose = $('.js-profile-modal-btn-close');
    var profileModalBtnSwitch = $('.js-profile-modal-btn-switch');


    /*====== events ======*/

    if (productCard && productOverlay && productCloseBtn) {
        productCard.on('click', openProductPopup);
        productOverlay.on('click', closeProductPopup);
        productCloseBtn.on('click', closeProductPopup);
    }

    if (profileAddressBtnEdit) {
        profileAddressBtnEdit.on('click', openProfileEditForm);
    }

    if (profileEdiFormBtnClose) {
        profileEdiFormBtnClose.on('click', closeProfileEditForm);
    }

    if (profileModal && profileModalOverlay && profileModalBtnClose && profileModalBtnSwitch) {
        profileModalOverlay.on('click', closeProfileModal);
        profileModalBtnClose.on('click', closeProfileModal);
        profileModalBtnSwitch.on('click', switchProfileModal);
    }


    /*====== functions ======*/

    function openProductPopup(event) {
        var cardData = getProductPopupData(event.currentTarget);

        setProductPopupData(cardData);
        productWrap.addClass('product-single-wrap--open');
    }

    function closeProductPopup() {
        if (productWrap) {
            productWrap.removeClass('product-single-wrap--open');
        }
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

    function openProfileEditForm(event) {

        var item = $(event.currentTarget).parent('.profile-address-item');

        item.after(profileEditForm);
        item.hide(0);
        profileEditForm.addClass('profile-edit-form--open');
    }

    function closeProfileEditForm(event) {
        event.preventDefault();
        var item = $(event.currentTarget).parents('.js-profile-edit-form').prev('.profile-address-item');

        item.show(0);
        profileEditForm.removeClass('profile-edit-form--open');
    }

    function closeProfileModal() {
        profileModal.hide(0);
    }

    function switchProfileModal(event) {
        event.preventDefault();

        var nextModalName = $(event.currentTarget).data('switch-modal');
        var nextModal = $('.js-profile-modal[data-modal="' + nextModalName + '"]');

        if (nextModal.length > 0) {
            $('.js-profile-modal').hide(0);
            nextModal.show(0);
        }
    }
}