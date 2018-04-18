$(document).ready(function () {
	$(".navbar-nav li").each(function () {
		// sama dengan seconds
		if ($(this).find("a").attr("data-name") == sec_REQURI) {
			// console.log($(this).find("a").attr("data-name"));
			$(this).addClass('active');
		}
	})
	$('#formsubmit').submit(function () {
		$(".status").empty().html('menunggu terkirim ke server ...');
		$(this).ajaxSubmit({
			error: function (xhr) {
				console.log(xhr);
				$(".status").empty().html('Error: ' + xhr.status);
				return false;
			},
			success: function (response) {
				$("#formsubmit").empty().html('<p>Terima kasih sudah menghubungi kami.</p>');
				return false;
			}
		})
		return false;
	});
});