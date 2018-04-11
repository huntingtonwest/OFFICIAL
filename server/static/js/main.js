$.fn.exists = function () {
    return this.length !== 0;
}

$('.delete').on('submit', function(event){
	var r = confirm("Are you sure you want to proceed?");
		if (r == false) {
    	event.preventDefault();
		}
});

$('.form').on('submit', function(event){
	event.preventDefault();

	var r = confirm("Are you sure you want to proceed?");
		if (r == false) {
			console.log('here')
    	return;
		}

  var form = $(this);
  var url = $(this).attr('action');
	$('div.img-preview').find('img').each(function(){
		if($(this).attr('src').length === 0){
			$(this).closest('div.img-row').remove();
		}
	});

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
			$('.field-errors').text('');
      if (response.status == 'success'){
				alert('success!')
				$('#dangerMsg').hide()
				$('#successMsg').html(response.msg);
        $('#successMsg').show();
				if (response.reload && response.reload=='true'){

						sessionStorage.showmsg = true;
						sessionStorage.msg = response.msg;
						window.location.reload();
				} else {
        	form[0].reset();
				}
      } else if (response.status == 'danger'){
				alert('There were errors.')
				if (response.form_errors){
					// console.log('here')
					// console.log($('div.field-errors').html())

					var errors = response.form_errors
					for (var k in errors){

						name = '.' + k + "-errors";
						// console.log(name)

						$(name).text(errors[k][0]);
					}
					// console.log(response.form_errors)
				}
				$('#successMsg').hide();
        $('#dangerMsg').html(response.msg);
        $('#dangerMsg').show();
      } else {
				alert('Something unknown happened. Try refreshing the page and try again.');
				$('#dangerMsg').html('Something went wrong. Refresh the page and try again.');
        $('#dangerMsg').show();
			}

    },
    error: function(error){
			alert('Something went wrong. Refresh the page and try again.');
			$('#dangerMsg').html('Something went wrong. Refresh the page and try again.');
			$('#dangerMsg').show();
    }
  });

});

// $(document).ready(function(){
// 	console.log('activated')
// 	if (sessionStorage.showmsg == true){
// 		$('#successMsg').html(sessionStorage.msg);
// 		$('#successMsg').show();
// 		// sessionStorage.showmsg=false;
// 		// sessionStorage.msg="";
// 	}
// })
