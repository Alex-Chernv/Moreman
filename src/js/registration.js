"use strict";

(function() {
	var $male = $(".js-registration-male"),
		$itemRegistrationForm = $(".js-birthday, .js-password");

	$(".js-checkbox-registration").on("change", function(e) {
		var $obj = $(this),
			$objRegistration = $(".js-registration");

		if($obj.is(":checked")) {
			$objRegistration.addClass("is-active");
			$itemRegistrationForm.prop('required', true);
		} else {
			$objRegistration.removeClass("is-active");
			$itemRegistrationForm.prop('required', false);
		}
	});

	$male.on("click", function(e) {
		e.preventDefault();

		var $obj = $(this);

		$male.removeClass("is-active");
		$obj.addClass("is-active");
	});
}());