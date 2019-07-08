"use strict";

(function() {
	var $nearFuture = $(".js-near-future"),
		$countText = $nearFuture.find(".js-form-input-counter-text");

	$(".js-change-date-near-future").on("click", function(e) {
		e.preventDefault();

		if($nearFuture.hasClass("is-active")) {
			closeNearFuture();
		} else {
			$nearFuture.addClass("is-active");
			initDataForm();
		}
	});

  	$nearFuture.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
		if($nearFuture.hasClass("is-active")) {
			$nearFuture.addClass("is-overflow");
		}
  	});

  	$(".js-cancel").on("click", function(e) {
  		var $obj = $(this),
  			$selects = $nearFuture.find(".js-select-full");

  		closeNearFuture();
  	});

  	$(".js-apply").on("click", function(e) {
  		closeNearFuture();
  	});

  	function initDataForm() {
  		var dateNow = new Date(),
  			hourNow = dateNow.getHours(),
  			minutesNow = dateNow.getMinutes();

  		$countText.eq(0).val(hourNow);
  		$countText.eq(1).val(minutesNow);
  	};

  	function closeNearFuture() {
		$nearFuture.removeClass("is-overflow");
		$nearFuture.removeClass("is-active");
  	};
}());