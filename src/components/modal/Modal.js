
// TODO: Need to either add jquery, or rebuild without jquery dependence
export const openModal = (title, body, btn_left, btn_right) => {
  // TODO: Initialize this straight from init.js original proto.
  // Should refactor these into components
  var $_container = $('#container').eq(0),
    $_close_btn = $_container.find('#close_btn').eq(0),
    $_alert = $_container.find('#alert').eq(0),
    $_alert_title = $_alert.find('h4').eq(0),
    $_alert_body = $_alert.find('p').eq(0),
    $_alert_btn_left = $_alert.find('.btn_left').eq(0),
    $_alert_btn_right = $_alert.find('.btn_right').eq(0);
    

	if (!btn_right) {
    btn_right = '';
  }
	$_alert_title.html(title);
	$_alert_body.html(body);
	$_alert_btn_left.html(btn_left);
	$_alert_btn_right.html(btn_right);
	if (btn_right != '') {
		$_alert_btn_right.addClass('btn_space');
  } else {
    $_alert_btn_right.removeClass('btn_space');
  }
	$_container.addClass('alert_show');
}

export const closeModal = () => {
  var $_container = $('#container').eq(0),
    $_close_btn = $_container.find('#close_btn').eq(0),
    $_alert = $_container.find('#alert').eq(0),
    $_alert_title = $_alert.find('h4').eq(0),
    $_alert_body = $_alert.find('p').eq(0),
    $_alert_btn_left = $_alert.find('.btn_left').eq(0),
    $_alert_btn_right = $_alert.find('.btn_right').eq(0);
    
	$_container.removeClass('alert_show');
}
