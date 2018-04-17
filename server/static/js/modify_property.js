var img_insert =  $('#img-preview-template');


$(function() {
    var renderImages = function(row, newimage) {

      var reader = new FileReader();
      reader.onload = function(event) {
        $(row).find('img').attr('src',event.target.result);
        $(row).find('.filename').text(newimage.name)
        $(row).find('.buttons').css('display','block');
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
      var preview_row = img_insert.clone().find('div.form-group');
      $(preview_row).insertBefore('div#img-preview');
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
