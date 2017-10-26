(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0], today = new Date();
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = 'https://sellfy.com/js/sdk.js?v=' + today.getFullYear()+''+today.getMonth()+''+today.getDate()+''+today.getHours();
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'sellfy-jssdk'));
