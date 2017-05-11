$(function() {
  $('#search-btn').on("click", getData);
  $("#search-input").keypress(function (event) {
    if(event.which == 13) {
      getData();
    }
  });

  function getData() {
    $('.list-group').html('');
    $('#err').hide();
    if($("#search-input").val()) {
      $.get('/get?artist=' + $("#search-input").val(), function(data) {
        console.log(data.err)
        if (data.html) {
          $('.list-group').html(data.html);
        } else if (data.err) {
          $('#err').show();
          $('.alert').html(data.err)
        } else {
          $('#err').show();
          $('.alert').html('Server error.')
        }
      });
    } else {
      $('#err').show();
      $('.alert').html('Search field must not be empty.')
    }
  }
});