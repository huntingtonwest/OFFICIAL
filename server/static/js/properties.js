
var $rows = $("tr.prop-row");

$('.sort').on('click', function () {
    var $temprows = $("tr.prop-row");
    var type = $(this).attr('id');
    var search = 'div.' + type;
    var name_ordered = $temprows.sort(function (a, b) {
        var a = $(a).find(search).text();
        var b = $(b).find(search).text();
        return a > b;
    });
    $("tbody#body").html(name_ordered);

    if (type == "order"){
      $('#sort-by-display').text('Sort by: edit date');
    } else {
      $('#sort-by-display').text('Sort by: ' + type);
    }

});

$('.filter').on('click', function () {
  var type = $(this).attr('id');

  if (type.match('rent|sale')){
    $rows.hide();
    var cls = '.' + type;
    $rows.find(cls).closest('.prop-row').show();
    $('#filter-by-display').text('Filter by: For ' + type);
  } else if (type == 'rs'){
    $rows.hide();
    $rows.find(".rent").closest('.prop-row').find('.sale').closest('.prop-row').show();
    $('#filter-by-display').text('Filter by: For rent and sale');
  } else if (type.match('neither')) {
    $rows.show();
    $rows.find('.rent, .sale').closest('.prop-row').hide();
    $('#filter-by-display').text('Filter by: Not for rent or sale');
  }
});

$('#reset').on('click', function(){
  $rows.show();
  $('#filter-by-display').text('Filter by: All');
});


$('a.maximizer').on('click', function(event){
  event.preventDefault();

  if ($(this).text() == "see more"){
    $(this).closest('tr').find('div.minimize').css('display','block');
    $(this).text('see less');
  } else {
    $(this).closest('tr.prop-row').find('div.minimize').css('display','none');
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


$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $rows.filter(function() {
      $(this).toggle($(this).find('.search').text().toLowerCase().indexOf(value) > -1);
    });
  });
});
