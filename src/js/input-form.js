"use strict";

(function() {
	var $inputElements = $(".js-input"),
		$inputNumbers = $(".js-input-number"),
		$inputCounterTop = $(".js-form-input-counter-top"),
		$inputCounterBottom = $(".js-form-input-counter-bottom");

	$inputElements.on("input propertychange", function(e) {
		var target = e.target,
			value = target.value,
			placeholder = target.previousSibling.previousSibling.previousSibling;

		if(value.length) {
			placeholder.classList.add("is-hide");
		} else {
			placeholder.classList.remove("is-hide");
		}
	});

	$inputNumbers.on("input propertychange", function() {
		var $obj = $(this),
			value = $obj.val(),
			newValue = value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');

		$obj.val(newValue);
	});

	$inputCounterTop.on("click", function(e) {
		e.preventDefault();

		var $obj = $(this),
			$count = $($obj.prev()),
			typeCount = $count.attr("type-input"),
			textCount = parseInt($count.val()),
			newCount = textCount + 1;

		if(typeCount === "hour" && newCount >= 24) {
			newCount = "00";
		} else if(typeCount === "min" && newCount >= 60) {
			newCount = "00";
		}

		$count.val(newCount);
	});

	$inputCounterBottom.on("click", function(e) {
		e.preventDefault();

		var $obj = $(this),
			$count = $($obj.prev().prev()),
			textCount = parseInt($count.val()),
			newCount = textCount - 1;

		if(newCount === 0 || newCount < 0 || !newCount) {
			newCount = "00";
		}

		$count.val(newCount);
	});
}());