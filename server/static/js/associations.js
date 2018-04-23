

var $rows = $("tr.acn-row");

$('#name_order').on('click', function () {
    var name_ordered = $rows.sort(function (a, b) {
        keyA = $(a).find('td.name').text().toLowerCase();
        keyB = $(b).find('td.name').text().toLowerCase();
        return (keyA < keyB) ? -1 : 1;
    });
    $("tbody#body").html(name_ordered);
});

$('#loc_order').on('click', function () {
    var loc_ordered = $rows.sort(function (a, b) {
        keyA = $(a).find('td.loc').text().toLowerCase()
        keyB = $(b).find('td.loc').text().toLowerCase()
        return (keyA > keyB) ? 1 : -1;
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
