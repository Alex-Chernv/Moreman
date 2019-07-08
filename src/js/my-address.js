"use strict";

(function() {
	var $myAddressCheckbox = $(".js-my-address"),
		$newAddress = $(".js-new-address"),
		$newAddressItem = $(".js-new-address-item"),
		$addressCurrent = $(".js-address-current"),
		$entranceCurrent = $(".js-entrance-current"),
		$doorphoneCurrent = $(".js-doorphone-current");

	$myAddressCheckbox.on("change", function(e) {
		e.preventDefault();

		var $obj = $(this);

		if($obj.is(":checked")) {
			$newAddress.addClass("is-active");
		} else {
			$newAddress.removeClass("is-active");
			$itemRegistrationForm.prop('required', true);
		}
	});

	$newAddressItem.on("click", function(e) {
		var $obj = $(this),
			dataAddress = $obj.attr("data-address"),
			dataEntrance = $obj.attr("data-entrance"),
			dataDoorphone = $obj.attr("data-doorphone");

		$addressCurrent.val(dataAddress).trigger("input");
		$entranceCurrent.val(dataEntrance).trigger("input");
		$doorphoneCurrent.val(dataDoorphone).trigger("input");

		resetNewAddress();
	});

	$(".js-new-address-close").on("click", function(e) {
		resetNewAddress();
	});

	function resetNewAddress() {
		$myAddressCheckbox.prop('checked', false);
		$newAddress.removeClass("is-active");
	};
}());