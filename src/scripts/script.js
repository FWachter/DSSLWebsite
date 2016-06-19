/*
PROGRAMMER: Frederick Wachter
DATE CREATED: 2016-04-27
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
   PURPOSE: Resize document properties with window is resize
   MAJOR CHANGES: 2016-05-21 | Add in the setHighlightedSection function and removed reset of '#selected' position
                  2016-05-31 | Removed scaling of project divs
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
   PURPOSE: Set the position of the section title highlighter
   MAJOR CHANGES: 2016-05-21 | Changed (previousIndex == index) if statement to not do anything instead of reset
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
			$("#menubar").css({
				"background":"rgba(25,25,25,0.95)"
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

/* -------------------- ----------------- -------------------- */
/* -------------------- Element Functions -------------------- */
/* -------------------- ----------------- -------------------- */
$(".sectionTitle").click(function() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   PURPOSE: Bring up section pages when the section title is clicked and change current page
   MAJOR CHANGES: 2016-05-21 | Removed parts and added to setHighlightedSection to allow for window resize trigger
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

$(".icon-phone").hover(
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-31
   PURPOSE: Trigger phone number for hovered member to appear
*/
	function() {
		var index = $(".icon-phone").index(this);
		$(".memberPhone").eq(index).css({
			"margin-top":"301px",
			"opacity":"1"
		});
	}, function() {
		var index = $(".icon-phone").index(this);
		$(".memberPhone").eq(index).css({
			"margin-top":"",
			"opacity":""
		});
	}
);
$(".memberPhone").hover(
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-06-05
   PURPOSE: Trigger phone number for hovered member to appear
*/
	function() {
		var index = $(".memberPhone").index(this);
		$(".memberPhone").eq(index).css({
			"margin-top":"301px",
			"opacity":"1"
		});
	}, function() {
		var index = $(".memberPhone").index(this);
		$(".memberPhone").eq(index).css({
			"margin-top":"",
			"opacity":""
		});
	}
);

$(".icon-email").hover(
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-31
   PURPOSE: Trigger email for hovered member to appear
*/
	function() {
		var index = $(".icon-email").index(this);
		$(".memberEmail").eq(index).css({
			"margin-top":"301px",
			"opacity":"1"
		});
	}, function() {
		var index = $(".icon-email").index(this);
		$(".memberEmail").eq(index).css({
			"margin-top":"",
			"opacity":""
		});
	}
);
$(".memberEmail").hover(
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-06-05
   PURPOSE: Trigger phone number for hovered member to appear
*/
	function() {
		var index = $(".memberEmail").index(this);
		$(".memberEmail").eq(index).css({
			"margin-top":"301px",
			"opacity":"1"
		});
	}, function() {
		var index = $(".memberEmail").index(this);
		$(".memberEmail").eq(index).css({
			"margin-top":"",
			"opacity":""
		});
	}
);

/* -------------------- ------------ -------------------- */
/* -------------------- Reset Screen -------------------- */
/* -------------------- ------------ -------------------- */
$("#reset").click(function() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   PURPOSE: Reset the screen back to the homepage
*/
	screenFlag = 0;
	sectionFlag = 0;
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	$("#menubar").css({
		"top":"",
		"background":""
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
});

/* -------------------- ----------------------- -------------------- */
/* -------------------- Contact Form Submission -------------------- */
/* -------------------- ----------------------- -------------------- */
$("#formSubmit").click(function() {
/* PROGRAMMER: Frederick Wachter - wachterfreddy@gmail.com
   DATE CREATED: 2016-06-19
   PURPOSE: Run function to clear form
*/
	clearForm();
});

function clearForm() {
/* PROGRAMMER: Frederick Wachter
   DATE CREATED: 2016-05-02
   PURPOSE: Clear the form
*/
	var elems = document.getElementsByTagName("input");
	var l = elems.length - 1;
	for (var i = 0; i < l; ++i) {
		elems[i].value = "";
	}
}


