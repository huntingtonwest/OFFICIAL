

var $rows = $("tr.acn-row");

$('#name_order').on('click', function () {
    var name_ordered = $rows.sort(function (a, b) {
        return $(a).find('td.name').text() > $(b).find('td.name').text();
    });
    $("tbody#body").html(name_ordered);
});

$('#loc_order').on('click', function () {
    var loc_ordered = $rows.sort(function (a, b) {
        return $(a).find('td.loc').text() > $(b).find('td.loc').text();
    });
    $("tbody#body").html(loc_ordered);
});

$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $rows.filter(function() {
      $(this).toggle($(this).find('.search').text().toLowerCase().indexOf(value) > -1)
    });
  });
});
