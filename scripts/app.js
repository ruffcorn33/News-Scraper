// scrape new job postings/ display modal 
$(document).on("click", "#scrapeBtn", function () {
  $.get("/scrape", function (data) {
    if (data.count) {
      $("#numPostings").text(data.count + " new job postings!");
    } else {
      $("#numPostings").text("No new postings found");
    }
    $("#scrapeModal").modal();
  });
});


// save job posting
$(document).on("click", "#saveposting", function () {
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saveposting/" + thisId
  })
    .then(function () {
      // Hide the matched elements with a sliding motion
      $("#" + thisId).slideUp();
    });
});

// save a note
$(document).on("click", "#savenote", function () {
  let postingId = $(this).attr("data-id");
  let newnote = $("#bodyinput").val();
  $.ajax({
    method: "POST",
    url: "/postings/" + postingId,
    data: { body: newnote }
  })
    .then(function (data) {
      getNotes(postingId);
    });
  $("#bodyinput").val("");
});
