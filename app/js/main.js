// Basic example of UI behavior
$(document).ready(function() {
	$(".btn.add-money, .drawer-close").click(function(event) {
		$(".drawer").toggle(300);
		event.preventDefault();
	});
	$(".header-notify .notifications").click(function(event) {
		$(".notifications-view").toggleClass("is-active animated");
		event.preventDefault();
	});
});