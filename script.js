$(function () {

  var hours = {
    start: 9,
    end: 17
  };

  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $('#currentDay').text(currentDate);
  var currentHour = dayjs().hour();
  // currentHour = 10;

  // Creating time block
  for (var i = hours.start; i <= hours.end; i++) {
    var timeBlockID = "hour-" + i;
    var timeLabel = dayjs().hour(i).format("hA");
    console.log(timeLabel);

    var timeBlock = $("<div>")
      .attr("id", timeBlockID)
      .addClass("row time-block")
      .append(
        $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(timeLabel)
      ).append(
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3")
      ).append(
        $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append(
          $("<i>").addClass("fas fa-save").attr("aria-hidden", "true")
        )
      );
    $(".container-fluid").append(timeBlock);
  }


  function updateTimeBlocks() {
    console.log("Current hour: " + currentHour);
    $('.time-block').each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      }
      else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      }
      else {
        $(this).removeClass("past present").addClass("future");
      }
    });

  }

  $(".time-block").each(displaySavedBlocks);

  function saveTimeBlock(){

    var timeBlockID = $(this).closest(".time-block").attr("id");
    var blockDescription = $(this).siblings(".description").val();
    console.log("Saving Time Block " + timeBlockID);
    console.log("Description: " + blockDescription);

    localStorage.setItem(timeBlockID, blockDescription);
    showsaveMsg();
  }

  $(document).on("click", ".saveBtn",  saveTimeBlock);

  function displaySavedBlocks(){
    $(".time-block").each(function() {
      var timeBlockId = $(this).attr("id");
      var blockDescription = localStorage.getItem(timeBlockId);
  
      if(blockDescription){
        $(this).find(".description").val(blockDescription);
      }
  
    });
  }

  function showsaveMsg(){
    $("#message").fadeIn().delay(2000).fadeOut();
  }

  updateTimeBlocks();
});
