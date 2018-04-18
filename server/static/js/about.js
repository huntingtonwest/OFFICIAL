$(document).on('click','button.up', function() {
  if ($(this).closest('tr').prev('tr').exists()){
    var current = $(this).closest('tr').clone();
    var prev = $(this).closest('tr').prev('tr');
    current.insertBefore(prev);
    $(this).closest('tr').remove();
    return;
  } else {
    return
  }
});

$(document).on('click','button.down', function() {
  if ($(this).closest('tr').next('tr').exists()){
    var current = $(this).closest('tr').clone();
    var next = $(this).closest('tr').next('tr');
    current.insertAfter(next);
    $(this).closest('tr').remove();
  } else {
    return;
  }
});

$('.about-delete').on('click', function(){

  var r = confirm("Are you sure you want to proceed?");
		if (r == false) {
    	return;
		}

	var formdata = new FormData();

  var url = $(this).closest('div').attr('action');
  var csrf = $("input[name='csrf_token']").attr('value');
  var id = $(this).find('input[name="id"]').attr('value');

  formdata.append('csrf_token',csrf);
  formdata.append('id',id);

  console.log(url)
  console.log(csrf)
  console.log(id)

  $.ajax({
    url: url,
    data: formdata,
    type: 'POST',
		processData: false,
    contentType: false,
    success: function(response){
			$('.field-errors').text('');
      window.scrollTo(0, 0);
      if (response.status == 'success'){
				alert('success!');
				$('#dangerMsg').hide();
				$('#successMsg').html(response.msg);
        $('#successMsg').show();

        window.location.reload();

      } else if (response.status == 'danger'){
				alert('There were errors.')
				if (response.form_errors){
					var errors = response.form_errors
					for (var k in errors){
						name = '.' + k + "-errors";
						$(name).text(errors[k][0]);
					}
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
