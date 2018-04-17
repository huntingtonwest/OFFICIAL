$(document).on('click','button.up', function() {
  console.log($(this).closest('tr'))
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
