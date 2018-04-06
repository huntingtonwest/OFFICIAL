
$('.form').on('submit', function(event){
	event.preventDefault();
  var form = $(this);
  var url = $(this).attr('action');

	var formdata = new FormData($(this)[0]);
// 	for (var [key, value] of formdata.entries()) {
//   console.log(key, value);
// }

  $.ajax({
    url: url,
    data: formdata,
    type: 'POST',
		processData: false,
    contentType: false,
    success: function(response){

      if (response.status == 'success'){
				$('#dangerMsg').hide()
				$('#successMsg').html(response.msg);
        $('#successMsg').show();
				if (response.reload && response.reload=='true'){
						alert(response.msg)
						window.location.reload();
				} else {
        	form[0].reset();
				}
      } else if (response.status == 'danger'){

				if (response.form_errors){
					var errors = response.form_errors
					for (var k in errors){
						name = '.' + k + "-errors";
						// console.log(name)
						$(name).html(errors[k][0]);
					}
					// console.log(response.form_errors)
				}
				$('#successMsg').hide();
        $('#dangerMsg').html(response.msg);
        $('#dangerMsg').show();
      }

    },
    error: function(error){
			$('#dangerMsg').html('Something went wrong. Refresh the page and try again.');
			$('#dangerMsg').show();
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
