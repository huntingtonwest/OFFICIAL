
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
    $rows.find('.rent, .sale').closest('.prop-row').hide();
  }
});

$('#reset').on('click', function(){
  $rows.show();
});

$(function() {
    var renderImages = function(row, newimage) {

      var reader = new FileReader();
      reader.onload = function(event) {
        var count = images.length;
        $(row).find('img').attr('src',event.target.result).css('display','block');
        $(row).find('button.up').css('display','block');
        $(row).find('button.down').css('display','block');
        $(row).find('button.delete').css('display','block');
        $(row).find('.filename').html(newimage.name).css('display','block');
        $(row).attr('count',count);
        $(row).find('input').attr('class','hidden');
        }
      reader.readAsDataURL(newimage);
    }
    $(document).on('change','.file-upload', function() {
      for (var i = 0; i < this.files.length; i++){
        var file = this.files[i];
        if (typeof file == 'undefined'){
          return;
        }
        renderImages(this.closest('.img-row'), file);
      }
    });

    $('#add-file').on('click', function(){
      var preview_row = $('#img-preview-template').find('.img-row').clone();
      preview_row.insertBefore('div#img-preview');
    });

    $(document).on('click','button.up', function() {

      if ($(this).closest('div.img-row').prev('div.img-row').exists()){
        var current = $(this).closest('div.img-row').clone();
        var prev = $(this).closest('div.img-row').prev('div.img-row');
        current.insertBefore(prev);
        $(this).closest('div.img-row').remove();
        return;
      } else {
        return
      }
    });

    $(document).on('click','button.down', function() {
      if ($(this).closest('div.img-row').next('div.img-row').exists()){
        var current = $(this).closest('div.img-row').clone();
        var next = $(this).closest('div.img-row').next('div.img-row');
        current.insertAfter(next);
        $(this).closest('div.img-row').remove();
      } else {
        return;
      }
    });
    $(document).on('click', 'button.delete', function(){
      $(this).closest('div.img-row').remove();
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
