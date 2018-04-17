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
    	return;
		}
  var form = $(this);
  var url = $(this).attr('action');
	$('div.image-list').find('img').each(function(){
		if($(this).attr('src').length === 0){
			$(this).closest('div.img-row').remove();
		}
	});
	var formdata = new FormData($(this)[0]);

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

$('a.hist-maximizer').on('click', function(event){
  event.preventDefault();

  if ($(this).text() == "see more"){
    $(this).closest('tr').find('div.minimize').css('display','block');
    $(this).text('see less');
  } else {
    $(this).closest('tr').find('div.minimize').css('display','none');
    $(this).text('see more');
  }
});

$('button#maximize-all').on('click', function(){
  $rows.each(function(){
    $(this).find('div.minimize').css('display','block');
    $(this).find('a.maximizer').text('see less');
  });
});
$('button#minimize-all').on('click', function(){
  $rows.each(function(){
    $(this).find('div.minimize').css('display','none');
    $(this).find('a.maximizer').text('see more');
  });
});

$('.big-warn-form').on('submit', function(event){
  var r = confirm("Are you sure you want to relinquish master admin title and privileges?");
		if (r == false) {
    	event.preventDefault();
		}
});
