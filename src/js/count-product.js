"use strict";

(function() {
	var Basket = {
		init: function() {
			this.$basketHeading = $(".js-basket-default");
			this.$basketPriceRight = $(".js-basket-price");
			this.$formPriceOldBlock = $(".js-price-form-old-block")
			this.$formPriceOld = $(".js-price-form-old");
			this.$formPrice = $(".js-price-form");

			this.$countPlus = $(".js-count-plus");
			this.$countMinus = $(".js-count-minus");

			this.allPrice = 0;
			this.oldPrice = 0;
			this.arrOldPrice = [];

			this.events();
		},

			// Базовые событие добавления/удаления товара или его количества 
		events: function() {
			this.$countPlus.on("click", function(e) {
				var $obj = $(this),
					$parentProduct = $obj.closest(".js-product"),
					dataId = $parentProduct.data("item-id"),
					$currentProduct = $('.js-order-item[data-item-id="'+dataId+'"]');

				if($currentProduct.length) {
					Basket.changeProductPlus($currentProduct, $parentProduct);
					Basket.changePricePlus($parentProduct, dataId);
				} else {
					Basket.addProduct($parentProduct, dataId);
				}

				Basket.countPlus($obj);
			});

			this.$countMinus.on("click", function(e) {
				var $obj = $(this),
					$parentProduct = $obj.closest(".js-product"),
					dataId = $parentProduct.data("item-id"),
					$currentProduct = $('.js-order-item[data-item-id="'+dataId+'"]');

				Basket.countMinus($obj);

				if($currentProduct.length) {
					Basket.minusProduct($parentProduct, dataId);
				}
			});
		},

			// Навешивание обработчиков на элементы товара в форма
		eventsFormProduct: function() {
			$(".js-form-product-delete").off("click").on("click", function(e) {
				e.preventDefault();

				var $obj = $(this),
					$currentProduct = $obj.closest(".js-order-item");

				Basket.deleteProduct($currentProduct);
			});

			$(".js-form-product-minus").off("click").on("click", function(e) {
				e.preventDefault();

				var $obj = $(this),
					$currentProduct = $obj.closest(".js-order-item"),
					dataId = $currentProduct.data("item-id"),
					$parentProduct = $('.js-product[data-item-id="'+dataId+'"]'),
					countElem = $parentProduct.find(".js-product-count"),
					$objCountProduct = $(countElem),
					newCount = +$objCountProduct.text() - 1;

				$objCountProduct.text(newCount);

				Basket.minusProduct($parentProduct, dataId);
			});

			$(".js-form-product-plus").off("click").on("click", function(e) {
				e.preventDefault();

				var $obj = $(this),
					$currentProduct = $obj.closest(".js-order-item"),
					dataId = $currentProduct.data("item-id"),
					$parentProduct = $('.js-product[data-item-id="'+dataId+'"]');

				Basket.changeProductPlus($currentProduct, $parentProduct);
				Basket.changePricePlus($parentProduct, dataId);
			});
		},

			// Уменьшение/удаление товара из корзины
		minusProduct: function($parentProduct, dataId) {
			var $currentProduct = $('.js-order-item[data-item-id="'+dataId+'"]'),
				countElem = $parentProduct.find(".js-product-count"),
				countProduct = Number($(countElem).text());

			if(!countProduct) {
				this.deleteProduct($currentProduct);
			} else {
				this.changeProductMinus($currentProduct, $parentProduct, countProduct);
				this.changePriceMinus($parentProduct, dataId);
			}
		},

			// Добавление товара в форме
		addProduct: function($parentProduct, dataId) {
			var text = $parentProduct.data("name"),
				htmlProduct,
				classOldPrice;

			var oldPrice = $parentProduct.data("old-price"),
				price = $parentProduct.data("price");

			(!oldPrice) ? (classOldPrice = "is-hidden") : (classOldPrice = "");

			htmlProduct = this.renderHTML(dataId, text, oldPrice, price, classOldPrice);

			$(".js-order").append(htmlProduct);

			this.changePricePlus($parentProduct, dataId);
			this.eventsFormProduct();
		},

			// Удаление товара из формы
		deleteProduct: function($parentProduct) {
			var dataId = $parentProduct.data("item-id"),
				priceProductElem = $parentProduct.find(".js-form-product-new").children().first(),
				oldPriceProductElem = $parentProduct.find(".js-form-product-old").children().first(),
				priceProduct = $(priceProductElem).text(),
				oldPriceProduct = Number($(oldPriceProductElem)[0].innerText),
				$productItem = $('.js-product[data-item-id="'+dataId+'"]'),
				$productCount = $($productItem.find(".js-product-count"));

			if(!oldPriceProduct) {
				oldPriceProduct = priceProduct;
			} else {
				this.changeArrOldPrice(dataId, true);
			}

			this.allPrice -= priceProduct;
			this.oldPrice -= oldPriceProduct;

			this.changePrice();
			this.changeOldPrice();

			$productCount.text(0);

			$parentProduct.remove();
		},

			// Добавление/удаление количества и цены продуктов формы
		changeProductPlus: function($currentProduct, $parentProduct) {
			var $objCount = $($currentProduct.find(".js-form-counter-text")),
				$objPrice = $($currentProduct.find(".js-form-product-new").children().first()),
				$objPriceOld = $($currentProduct.find(".js-form-product-old").children().first()),
				count = +$objCount.text(),
				priceProduct = +$objPrice.text(),
				oldPriceProductnt = +$objPriceOld.text();

			var oldPrice = +$parentProduct.data("old-price"),
				price = +$parentProduct.data("price");

			var newCount = count + 1,
				newPrice = priceProduct + price,
				newOldPrice = oldPriceProductnt + oldPrice;

			$objCount.text(newCount);
			$objPrice.text(newPrice);
			$objPriceOld.text(newOldPrice);
		},
		changeProductMinus: function($currentProduct, $parentProduct, countProduct) {
			var countElem = $currentProduct.find(".js-form-counter-text"),
				$objPrice = $($currentProduct.find(".js-form-product-new").children().first()),
				$objPriceOld = $($currentProduct.find(".js-form-product-old").children().first()),
				$objCount = $(countElem),
				priceProduct = +$objPrice.text(),
				oldPriceProductnt = +$objPriceOld.text();

			var oldPrice = +$parentProduct.data("old-price"),
				price = +$parentProduct.data("price");

			var newPrice = priceProduct - price,
				newOldPrice = oldPriceProductnt - oldPrice;
			
			$objCount.text(countProduct);
			$objPrice.text(newPrice);
			$objPriceOld.text(newOldPrice);
		},

			// Увеличение/уменьшение общих цен на странице
		changePricePlus: function($parentProduct, dataId) {
			var oldPrice = +$parentProduct.data("old-price"),
				price = +$parentProduct.data("price");

			this.allPrice += price;

			if(!oldPrice) {
				this.oldPrice += price;
			} else {
				this.changeArrOldPrice(dataId);
				this.oldPrice += oldPrice;
			}

			this.changePrice();
			this.changeOldPrice();
		},
		changePriceMinus: function($parentProduct, dataId) {
			var oldPrice = +$parentProduct.data("old-price"),
				price = +$parentProduct.data("price");

			this.allPrice -= price;

			if(!oldPrice) {
				this.oldPrice -= price;
			} else {
				this.changeArrOldPrice(dataId);
				this.oldPrice -= oldPrice;
			}

			this.changePrice();
			this.changeOldPrice();
		},

			// Изменение общей цены в header, шапке и подвале формы
		changePrice: function() {
			if(this.allPrice) {
				this.$formPrice.text(this.allPrice);
				this.$basketPriceRight.children().first().text(this.allPrice);

				this.$basketPriceRight.removeClass("is-hidden");
				this.$basketHeading.addClass("is-hidden");
			} else {
				this.$formPrice.text(0);
				this.$basketPriceRight.children().first().text(0);

				this.$basketPriceRight.addClass("is-hidden");
				this.$basketHeading.removeClass("is-hidden");
			}
		},

			// Изменение старой цены в header, шапке и подвале формы
		changeOldPrice: function() {
			if(this.arrOldPrice.length) {
				this.$formPriceOldBlock.text(this.oldPrice);
				this.$formPriceOldBlock.removeClass("is-hidden");
			} else {
				this.$formPriceOldBlock.text("");
				this.$formPriceOldBlock.addClass("is-hidden");
			}
		},

		renderHTML: function(id, text, oldPrice, price, classOldPrice) {
			var htmlProduct = $("#template_product").text();

			htmlProduct = htmlProduct.replace("{id}", id);
			htmlProduct = htmlProduct.replace("{text}", text);
			htmlProduct = htmlProduct.replace("{oldPrice}", oldPrice);
			htmlProduct = htmlProduct.replace("{price}", price);
			htmlProduct = htmlProduct.replace("{classOldPrice}", classOldPrice);

			return htmlProduct;
		},

		countPlus: function($obj) {
			var $count = $($obj.prev()),
				text = +$count.text() + 1;

			$count.text(text);
		},

		countMinus: function($obj) {
			var $count = $($obj.next()),
				text = +$count.text();

			(text) ? (text--) : "";

			$count.text(text);
		},

		changeArrOldPrice: function(dataId, statusDelete) {
			var positionIdOld = this.arrOldPrice.indexOf(dataId);

			if(statusDelete) {
				this.arrOldPrice.splice(positionIdOld, 1);
			} else if(positionIdOld < 0) {
				this.arrOldPrice.push(dataId)
			}
		}
	};

	Basket.init();
}());