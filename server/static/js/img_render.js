$(function() {
    var renderImage = function(row, newimage) {

      var reader = new FileReader();
      reader.onload = function(event) {
        console.log(row)
        $(row).css('display','block');
        $(row).attr('src','');
        $(row).attr('src',event.target.result);
        }
      reader.readAsDataURL(newimage);
    }
    $('#file-upload').on('change', function() {
      var file = this.files[0];
      console.log(file)
      if (typeof file == 'undefined'){
        return;
      }
      console.log(file)
      renderImage($('img#img-preview'), file);
    });




});
