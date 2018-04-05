
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
});

$('.filter').on('click', function () {
  var type = $(this).attr('id');

  if (type.match('rent|sale')){
    $rows.hide();
    var cls = '.' + type;
    $rows.find(cls).closest('.prop-row').show();
  } else if (type == 'rs'){
    $rows.hide();
    $rows.find(".rent").closest('.prop-row').find('.sale').closest('.prop-row').show();

  } else if (type.match('neither')) {
    $rows.show();
    $rows.find('.rent, .sale').closest('.prop-row').hide()
  }
});

$('#reset').on('click', function(){
  $rows.show();
});

$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $rows.filter(function() {
      $(this).toggle($(this).find('.search').text().toLowerCase().indexOf(value) > -1)
    });
  });
});
