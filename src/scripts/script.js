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
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var leftPosition = $(".sectionTitle").eq(index).offset().left;

	offsetSections(index,windowWidth); // Update offset of sections

	$("#intro").css({height:$(window).height()});
	$("#sections").css({
		"height":(windowHeight) + "px"
	});$("#selected").css({
		"left":leftPosition
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

/* -------------------- -------------- -------------------- */
/* -------------------- Section Offset -------------------- */			
/* -------------------- -------------- -------------------- */
function offsetSections(index,windowWidth) {
	var offset = (-index) * windowWidth;
	for (var i = 0; i < totalSections; i++) {
		$(".section").eq(i).css({
			"left":offset + (windowWidth * i) + "px"
		});
	}
}

/* -------------------- ------------------ -------------------- */
/* -------------------- Menu Item Selector -------------------- */
/* -------------------- ------------------ -------------------- */
$(".sectionTitle").click(function() {
	if (sectionFlag == 0) {
		sectionFlag = 1;
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
	/* HINT: Index starts from 0 */
	index = $(this).index() - 1;
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
		if (previousIndex == index) { // If the current section button has been clicked again
			$(".sectionTitle").eq(index).css({
				"color":""
			});
			$("#selected").css({
				"left":"",
				"width":"",
				"opacity":"1"
			});
			index = -1; // Reset the menu button index indicator
			offsetSections(index,windowWidth); // Update offset of sections
			screenFlag = 0; // Reset the current section indicator
			previousIndex = -1; // Reset the previous index indicator
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
});

/* -------------------- ------------ -------------------- */
/* -------------------- Reset Screen -------------------- */
/* -------------------- ------------ -------------------- */
$("#reset").click(function() {
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