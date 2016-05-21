/*
PROGRAMMER: Frederick Wachter
DATE CREATED: 2016-04-27
LAST MODIFIED: 2016-05-21
PURPOSE: Official website of the Drexel Space Systems Laboratory
CONTACT INFO: wachterfreddy@gmail.com
*/

/* -------------------- --------- -------------------- */
/* -------------------- Variables -------------------- */
/* -------------------- --------- -------------------- */
var index = -1;
var sectionFlag   = 0; // Indicates if a menu button has been clicked
var screenFlag    = 0; // Indicates if a one of the sections are showing
var previousIndex = -1; // Indacates the previous menu button that has been clicked if there is one
var totalSections = $(".section").length;

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */
windowResize();
$(window).resize(function() {
	windowResize();
});
function windowResize() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-21
   PURPOSE: Resize document properties with window is resize
   UPDATES: 2016-05-21 | Add in the setHighlightedSection function and removed reset of '#selected' position
*/
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	offsetSections(index,windowWidth); // Update offset of sections
	setHighlightedSection();

	$("#intro").css({height:$(window).height()});
	$("#sections").css({
		"height":(windowHeight) + "px"
	});
	$(".section").css({
		"height":(windowHeight - 120) + "px"
	});
	$(".project").css({
		"height":((windowHeight - 210) / 2) - 10 + "px",
		"width":((windowWidth - 40) / 2) - 18 + "px"
	});
	$(".projectInfo").css({
 		"height":((windowHeight - 210) / 2) - 60 + "px"
	});

	if (sectionFlag == 1) {
		$("#menubar").css({
			"top":(windowHeight - 120) + "px"
		});
	} else {
		$("#sections").css({
			"top":(-windowHeight) + "px"
		});
	}
}

/* -------------------- --------- -------------------- */
/* -------------------- Functions -------------------- */			
/* -------------------- --------- -------------------- */
function offsetSections(index,windowWidth) {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Offset section pages
*/
	var offset = (-index) * windowWidth;
	for (var i = 0; i < totalSections; i++) {
		$(".section").eq(i).css({
			"left":offset + (windowWidth * i) + "px"
		});
	}
}
function setHighlightedSection() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-21
   PURPOSE: Set the position of the section title highlighter
   UPDATES: 2016-05-21 | Changed (previousIndex == index) if statement to not do anything instead of reset
*/
   	if (sectionFlag == 1) {
		var windowWidth  = $(window).width();
		var leftPosition = $(".sectionTitle").eq(index).offset().left;
		var titleWidth   = $(".sectionTitle").eq(index).width() + 20;
		var offset       = (-index) * windowWidth;
		if (screenFlag == 0) { // If no sections are showing
			screenFlag = 1;
			offsetSections(index,windowWidth); // Update offset of sections
			$(".sectionTitle").eq(index).css({
				"color":"black"
			});
			$("#selected").css({
				"left":leftPosition,
				"width":titleWidth,
				"opacity":"1"
			});
			previousIndex = index;
		} else {
			if (previousIndex == index) { // If the current section button has been clicked again or window resize
				$("#selected").css({
					"left":leftPosition
				});
			} else { // If a section is showing and a new menu button has been clicked
				offsetSections(index,windowWidth); // Update offset of sections
				$(".sectionTitle").eq(previousIndex).css({
					"color":""
				});
				$(".sectionTitle").eq(index).css({
					"color":"black"
				});
				$("#selected").css({
					"left":leftPosition,
					"width":titleWidth
				});
				previousIndex = index;
			}
		}
	}
}

/* -------------------- ------------------ -------------------- */
/* -------------------- Menu Item Selector -------------------- */
/* -------------------- ------------------ -------------------- */
$(".sectionTitle").click(function() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-21
   PURPOSE: Bring up section pages when the section title is clicked and change current page
   UPDATES: 2016-05-21 | Removed parts and added to setHighlightedSection to allow for window resize trigger
*/
	index = $(this).index() - 1; // get the section that was clicked

	if (sectionFlag == 0) { // if there isn't any pages showing
		sectionFlag = 1; // set the flag to indicate that a page is now showing
		var windowHeight = $(window).height();
		
		$("#menubar").css({
			"top":(windowHeight - 120) + "px"
		});
		$("#reset").css({
			"bottom":"0px"
		});
		$("#sections").css({
			"top":"0",
			"opacity":"1"
		});
		$("#intro").css({
			"opacity":"0"
		});
		$("#sidebar").css({
			"opacity":"0"
		});
	}

	setHighlightedSection(); // update the position of the section hightlighter
});

/* -------------------- ------------ -------------------- */
/* -------------------- Reset Screen -------------------- */
/* -------------------- ------------ -------------------- */
$("#reset").click(function() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Reset the screen back to the homepage
*/
	sectionFlag = 0;
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	$("#menubar").css({
		"top":""
	});
	$("#reset").css({
		"bottom":""
	});
	$("#sections").css({
		"top":(-windowHeight) + "px",
		"opacity":""
	});
	$("#intro").css({
		"opacity":""
	});
	$("#sidebar").css({
		"opacity":""
	});
	$(".sectionTitle").eq(index).css({
		"color":""
	});
	$("#selected").css({
		"left":"",
		"width":"",
		"opacity":""
	});
	index = -1; // Reset the menu button index indicator
	offsetSections(index);
	screenFlag = 0;
});

/* -------------------- ----------------------- -------------------- */
/* -------------------- Contact Form Submission -------------------- */
/* -------------------- ----------------------- -------------------- */
$("#contactForm").submit(function(event) {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Check for errors in the form and build the message to send using Mandrill service
*/
	var errorMessage = "";
	event.preventDefault(); // Stops URL form update

	if ($("#name").val() == "") {
		errorMessage = "Please enter your name.";
	}
	if (!isValidEmailAddress($("#email").val())) {
		if (errorMessage == "") {
			errorMessage = "Please enter a valid email address.";
		} else {
			errorMessage = errorMessage + "<br/>Please enter a valid email address.";
		}
	}
	if (!$.isNumeric($("#phone").val()) && $("#phone").val() != "") {
		if (errorMessage == "") {
			errorMessage = "Please enter a valid phone number.";
		} else {
			errorMessage = errorMessage + "<br/>Please enter a valid phone number.";
		}
	}
	if ($("#contactRequest").val() == "") {
		if (errorMessage == "") {
			errorMessage = "Please enter a message.";
		} else {
			errorMessage = errorMessage + "<br/>Please enter a message.";
		}
	}

	if (errorMessage == "") {
		sendMail();
		clearForm();
		alert("Contact Request Submitted!");
	} else {
		$("#error").html(errorMessage);
	}
})
function sendMail() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Send mail using the Mandripp Service
*/
	$.ajax({
		url: "https://mandrillapp.com/api/1.0/messages/send.json",
		type: "POST",
		dataType: 'json',
		data: {
			'key': 'CvhTgajhxOvroFDzWKu9Jw',
			'message': {
				'from_email': $("#email").val(),
				'to': [{
					'email': 'f.wachter@hotmail.com',
					'name': $("#name").val(),
					'type': 'to'
				}],
				'autotext': 'true',
				'subject': 'DSSL Contact Request',
				'html': generateResponse()
			}
		}
	}); //.done(function(response) {
	//	console.log(response);
	//});
}
function generateResponse() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Build message details for Mandrill service
*/
	var response = '';
	response = 'Name: ' + $("#name").val() + '<br/>';
	response = response + 'Email: ' + $("#email").val() + '<br/>';
	if ($("#phone").val() == "") {
		response = response + 'Phone Number: Phone number not given' + '<br/>';
	} else {
		response = response + 'Phone Number: ' + $("#phone").val() + '<br/>';
	}
	response = response + 'Date: ' + currentDate() + '<br/>';
	response = response + 'Time: ' + currentTime() + '<br/><br/>';
	response = response + 'Message: <br/>' + $("#contactRequest").val();
	return response;
}
function currentDate() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Get the current date
*/
	var currentDate = new Date;
	var Day = currentDate.getDate();
	if (Day < 10) {
		Day = '0' + Day;
	}
	var Month = currentDate.getMonth() + 1;
	if (Month < 10) {
		Month = '0' + Month;
	}
	var Year = currentDate.getFullYear();
	var fullDate = Month + '/' + Day + '/' + Year;
	return fullDate;
}
function currentTime() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Get the current time
*/
	var currentTime = new Date;
	var Minutes = currentTime.getMinutes();
	if (Minutes < 10) {
		Minutes = '0' + Minutes;
	}
	var Hour = currentTime.getHours();
	if (Hour > 12) {
		Hour -= 12;
	}
	var Time = Hour + ':' + Minutes;
	if (currentTime.getHours() <= 12) {
		Time += ' AM';
	}
	if (currentTime.getHours() > 12) {
		Time += ' PM';
	}
	return Time;
}
function clearForm() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   LAST MODIFIED: 2016-05-02
   PURPOSE: Clear the form
*/
	var elems = document.getElementsByTagName("input");
	var l = elems.length - 1;
	for (var i = 0; i < l; ++i) {
		elems[i].value = "";
	}

	elems = document.getElementsByTagName("textarea");
	var l = elems.length;
	for (var i = 0; i < l; ++i) {
		elems[i].value = "";
	}

	$("#error").html("");
}