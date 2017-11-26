// Initialization of constants.
const youtubeUrlStart = "https://www.youtube.com/embed/";
const allVideosArray = [
  {url: "rRl7ovh2zik", title: "From One Stillness to Another", day: 1},
  {url: "dbTZOEXPIGw", title: "Clacks Ahoy", day: 2},
  {url: "IEBxwOSBxjA", title: "Displacement", day: 3},
  {url: "HmMUYKfN-7w", title: "Stuttered Trail", day: 4},
  {url: "9a0gaeSsbng", title: "Post-Game Content", day: 5},
  {url: "EJJotX54J9E", title: "Heavy", day: 6},
  {url: "qzpgFlnBJcM", title: "Subliminal", day: 7},
  {url: "o9L3BJQCTSM", title: "Withdrawal", day: 8},
  {url: "FaKWKOxEFNA", title: "Ordinal", day: 9},
  {url: "_MU6cvn8dWU", title: "Day Ten", day: 10},
  {url: "1hjIZQHocIs", title: "Pitch", day: 11},
  {url: "OQhjyp2HEpw", title: "Holism", day: 12},
  {url: "CUDaoZ-GwC0", title: "Frequency", day: 13},
  {url: "9SZyQnUJYYw", title: "Invitation", day: 14},
  {url: "7KZo9SH3GXs", title: "Just One Time", day: 15},
  {url: "VyV4W0XVEmU", title: "Thinly Skinned", day: 16},
  {url: "oKNdrHHdKx0", title: "An Unhelpful Particular", day: 17},
  {url: "HIXYN734I4s", title: "Transfer", day: 18},
  {url: "8jTB6i4v8m8", title: "Inquiry in the Key of Rage", day: 19},
  {url: "wEWUQoVXkv8", title: "Programming for Younger Students", day: 20},
  {url: "9gUV3_DmlGw", title: "Welts Take Sleep to Heal", day: 21},
  {url: "nZTSYiGkYqc", title: "The Ones Who Like the Sun", day: 22},
  {url: "MOplVjq6_S4", title: "An Administrative Assistant's Apology", day: 23},
  {url: "RyqjZBfxOwU", title: "Beyond the Classroom", day: 24},
  {url: "46i07LTaFi0", title: "The Combination", day: 25},
  {url: "W2xtaYsoFS4", title: "Conversation on a Balcony", day: 26},
  {url: "plIKDzmZD4k", title: "A Girl's Best Friend", day: 27},
  {url: "aTRaG5HAknQ", title: "1:00 A.M. in Utah", day: 28},
  {url: "0ISA0MuIFf4", title: "Nothing but a Mood", day: 29},
  {url: "EpGTr-ciuDo", title: "Finale", day: 30}
];
const all = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
const recommended = [2, 5, 6, 23, 27, 30];

// Initialization of variables.
let currentVideoIndex = 0;
let currentPlaylist = allVideosArray;

$(document).ready(function(){
  // Initializing controls
  SetPlaylist(all);
  $("#playlist-controls").prop("selectedIndex", 0)
  $("#default-color").prop("checked", true);
  $("#normal-player-size").prop("checked", true);

  // Initializing form inputs
  $(".form-control").val("");

  // Setting click handlers
  $(".prevBtn").on("click", PreviousVideo);
  $(".nextBtn").on("click", NextVideo);

  $("#controls-toggle").on("click", function(){
    $("#controls-plus").toggle();
    $("#controls-minus").toggle();
  });

  $("#comment-toggle").on("click", function(){
    $("#comment-plus").toggle();
    $("#comment-minus").toggle();
  });

  $("#close-form-success-alert").on("click", function(){
    $("#form-submitted-successfully").hide();
  });

  $("#submit-button").on("click", function(){
    // if the user hasn't already dismissed the "form submitted" message from last submission, dismiss it now.
    $("#form-submitted-successfully").hide();

    var validationErrors = ValidateForm();
    if (validationErrors.length == 0)
    {
      // Dummy function. Shows "form submitted" message but does not really submit form to any server.
      SubmitForm();
    }
    else
    {
      DisplayValidationErrors(validationErrors);
    }
  });

  // Setting dropdown menu change handlers
  $("#playlist-controls").on("change", function(){
    switch($("#playlist-controls :selected").attr("id")) {
        case "playlist-all-days":
          SetPlaylist(all);
          break;
        case "playlist-recommended-days":
          SetPlaylist(recommended);
          break;
        case "playlist-prime-days":
          SetPlaylist(primes);
        break;
        case "playlist-random-days":
          SetRandomDays();
        break;
        default:
          console.log("An error has occurred.");
    }
  });

  $("#video-selector").on("change", function(){
    var videoSelected = $("#video-selector :selected").attr("id");
    if (videoSelected != "no-video-selected")
    {
      GoToVideoByPlaylistId(videoSelected);
      currentVideoIndex = videoSelected;
    }
  });

  // Setting radio button change handlers
  $("#color-controls input").on("change", function() {
    if (this.checked)
    {
      //make the parent element of the page inherit the id with the relevant style information
      $(".container").attr("class", "container " + $(this).attr("id"));
      // change the background color of the body by passing it the class as well
      $("body").attr("class", "body-" + $(this).attr("id"));
    }
  });

  $("#size-controls input").on("change", function() {
    if (this.checked)
    {
      if($(this).attr("id") == "normal-player-size")
      {
        $("#youtube-embed-container").attr("class", "col-xs-12 col-sm-10 col-md-8 col-lg-6 embed-responsive embed-responsive-16by9");
        // Change size of controls to keep them at the sides of the video on affected screen widths.
        $(".desktop-navigation").attr("class", "desktop-navigation col-sm-1 col-md-2 col-lg-3 d-none d-sm-block")
      }
      else if($(this).attr("id") == "large-player-size")
      {
        $("#youtube-embed-container").attr("class", "col-xs-12 col-sm-10 embed-responsive embed-responsive-16by9");
        // Change size of controls to keep them at the sides of the video on affected screen widths.
        $(".desktop-navigation").attr("class", "desktop-navigation col-sm-1 d-none d-sm-block")
      }
      else
      {
        console.log("An error has occurred.")
      }
    }
  });

  // now that the page is initialized, we display it (for smoother loading)
  $("body").show();
});

// Validates the form. Returns an object containing validation errors. If object is empty, form is valid.
function ValidateForm()
{
  // first we remove all pre-existing validation errors.
  $("#feedback-form .is-invalid").removeClass("is-invalid");

  var validationErrors = [];

  var nameInput = $("#feedback-name").val() || "";
  if (nameInput.length == 0)
  {
    validationErrors.push(
    {
        field: "name",
        message: "Name must not be blank!"
    });
  }
  else if (nameInput.length > 49)
  {
    validationErrors.push(
    {
      field: "name",
      message: "Please provide your name in fewer than 50 characters!"
    });
  }

  // regular expression that determines if a string is of the form "x@x.x" - very permissive email-verification.
  var re = /\S+@\S+\.\S+/;
  var emailInput = $("#feedback-email").val() || "";
  // email can be blank, but can't be invalid
  if (emailInput.length > 0 && !re.test(emailInput))
  {
    validationErrors.push(
    {
      field: "email",
      message: "Email isn't required, but it looks like you may have mistyped your email address. Please either leave this field blank or use a valid email."
    });
  }

  var commentInput = $("#feedback-message").val() || "";
  if (commentInput.length == 0)
  {
    validationErrors.push(
    {
      field: "message",
      message: "Message must not be blank!"
    });
  }
  else if (commentInput.length > 2000)
  {
    validationErrors.push(
    {
      field: "message",
      message: "Please keep your message shorter than 2,000 characters!"
    });
  }

  return validationErrors;
}

// Given an errors object from ValidateForm(), displays validation elements and styles.
function DisplayValidationErrors(errors)
{
  for (i = 0; i < errors.length; i++)
  {
    // add the bootstrap 4 is-invalid class to the field, highlighting it
    $("#feedback-" + errors[i].field).addClass("is-invalid");

    // add the correct error message below the relevant field for each error
    $("#" + errors[i].field + "-form-group .invalid-feedback").html(errors[i].message);
  }
}

// Dummy function to "submit" the form and show visual indication of valid input successfully submitted.
function SubmitForm()
{
  ClearForm();
  $("#form-submitted-successfully").show();
}

// Clears the form. We do this on page load and after successful submission.
function ClearForm()
{
  // clears the contents of every form element on the page - only works given exactly one form on page.
  $(".form-control").val("");
}

// Sets the target of the youtube video, given a video's youtube ID.
function ChangeVideoToTarget(targetString)
{
  $("#youtube-embed-frame").attr("src", youtubeUrlStart + targetString);
}

// Moves to the previous video in the active playlist.
function PreviousVideo()
{
  ChangeVideoToTarget(currentPlaylist[currentVideoIndex - 1].url);
  currentVideoIndex--;

  CheckPrevAndNext(currentVideoIndex);
}

// Moves to the next video in the active playlist.
function NextVideo()
{
  // subtract 0 to cast currentVideoIndex as a number - otherwise it concatenates with "1" as a string.
  ChangeVideoToTarget(currentPlaylist[(currentVideoIndex - 0) + 1].url);
  currentVideoIndex++;

  CheckPrevAndNext(currentVideoIndex);
}

// Given a set of ints representing days of the month, sets the active palylist to include those videos.
function SetPlaylist(days)
{
  currentPlaylist = [];

  for (var n = 0; n < days.length; n++)
  {
    // Days start with 1, while array positions start with 0, so we subtract 1.
    var videoToAdd = allVideosArray[days[n] - 1];
    currentPlaylist.push(videoToAdd);
  }

  // Initialize the new playlist.
  ChangeVideoToTarget(currentPlaylist[0].url);
  PopulateVideoSelector(currentPlaylist);
  // Always hides the previous button when called here - but would still hide the correct buttons even if sometimes playlists started at the end or middle.
  CheckPrevAndNext(currentVideoIndex);
}

// Populates the video selector dropdown list with values from the currently active playlist.
function PopulateVideoSelector(playlist)
{
  $("#video-selector").html("<option id='no-video-selected' selected>Select a video...</option>");

  for (var n = 0; n < playlist.length; n++)
  {
    var optionString = "Day " + playlist[n].day + ": " + playlist[n].title;
    $("#video-selector").html($("#video-selector").html() + "<option id='" + n + "'>" + optionString + "</option>");
  }
}

// Navigates to a video by its position in the active playlist.
function GoToVideoByPlaylistId(id)
{
  ChangeVideoToTarget(currentPlaylist[id].url);
  CheckPrevAndNext(id);
}

// Hides previous or next buttons where appropriate.
function CheckPrevAndNext(id)
{
  if(id == currentPlaylist.length - 1)
  {
    $(".nextBtn").hide();
  }
  else
  {
    $(".nextBtn").show();
  }

  if(id == 0)
  {
    $(".prevBtn").hide();
  }
  else
  {
    $(".prevBtn").show();
  }
}

// Generates a new list of 8 distinct random days, then passes it into the SetPlaylist function.
function SetRandomDays()
{
  var result = [];
  while(result.length < 8)
  {
    var randomNum = Math.floor(Math.random()*30) + 1;
    if(result.indexOf(randomNum) > -1)
    {
      continue;
    }
    result[result.length] = randomNum;
  }

  SetPlaylist(result);
}
