$(function() {
    var renderImage = function(row, newimage) {

      var reader = new FileReader();
      reader.onload = function(event) {
        $(row).css('display','block');
        $(row).attr('src','');
        $(row).attr('src',event.target.result);
        }
      reader.readAsDataURL(newimage);
    }
    $('#file-upload').on('change', function() {
      var file = this.files[0];
      if (typeof file == 'undefined'){
        return;
      }
      renderImage($('img#img-preview'), file);
    });




});
