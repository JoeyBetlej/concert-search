$(function() {

  $('#search-btn').on("click", getData);

  $("#search-input").keypress(function (event) {
    if(event.which == 13) { // Enter key
      getData();
    }
  });

  /**
   * Triggers an ajax call to the server which retrieves the list of concerts
   * for the artist entered into the text field.
   */
  function getData() {
    $('.list-group').html('');
    $('#err').hide();
    if($("#search-input").val()) {
      $.get('/get?artist=' + encodeURIComponent($("#search-input").val()), function (data) {
        if (data.html) {
          $('.list-group').html(data.html);
        } else if (data.err) {
          $('#err').show();
          $('.alert').html(data.err)
        } else {
          $('#err').show();
          $('.alert').html('Server error.')
        }
      }).fail(function () {
        $('#err').show();
        $('.alert').html('Failed to connect to server.');
      });
    } else {
      $('#err').show();
      $('.alert').html('Search field must not be empty.');
    }
  }
});