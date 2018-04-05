
$('.form').on('submit', function(event){
	event.preventDefault();
  var form = $(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    data: $(this).serialize(),
    type: 'POST',
    success: function(response){

      if (response.status == 'success'){
				if (response.reload && response.reload=='true'){
						window.location.reload();
				} else {
        $('#successMsg').html(response.msg);
        $('#successMsg').show();
        form[0].reset();
				}
      } else if (response.status == 'danger'){
        $('#dangerMsg').html(response.msg);
        $('#dangerMsg').show();
      }

    },
    error: function(error){
      alert('Something went wrong. Refresh the page and try again.');
    }
  });

});

$('.delete').on('submit', function(event){
	var r = confirm("Are you sure you want to proceed?");
		if (r == false) {
    	event.preventDefault();
		}
});





	// post_form = new FormData();
// $('#form').on('submit', function() {
//   event.preventDefault();
//
//   var options = {
//     beforeSubmit: presubmit
//   };
//   alert('here')
//   this.ajaxSubmit(options);
//   alert('sds')
//   return false;
// });
//
// function presubmit(){
//   alert('pressed')
// }
	// $.ajax({
 	// 	type: "POST",
  // 		url: "/ajax_post/" + forum_name + "/" + forum_id,
  // 		contentType: false,
  //   	processData: false,
  // 		data: post_form,
  // 		success: function(data) {
  // 			if (data.redirect){
  // 				window.location.replace(data.redirect);
  // 			} else if (data.is_success){
  // 				form[0].reset();
  //   			resetPreview(form);
  //
  //         window.location.reload()
  // 			} else {
  // 				alert(data.msg)
  // 				// form.parent().children('.alert-danger').css('display',block).html(data.msg)
  // 			}
  //
  // 		},
  // 		error: function(data){
  //   		alert('A problem occured')
  // 		}
	// });
// });
