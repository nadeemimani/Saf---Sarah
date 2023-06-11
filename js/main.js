/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
   $(window).load(function() {

      // will first fade out the loading animation
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(5).fadeOut("slow");

      });

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	}

       	// trigger once only
       	this.destroy();

		},

		offset: "90%"

	});


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {
		  	itemSelector: '.folio-item',
		  	resize: true
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });


	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {

   	// update the toggle button
   	toggleButton.toggleClass('is-clicked');
   	// fadeout the navigation panel
   	nav.fadeOut();

  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {

	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});


   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() {

		      	sLoader.fadeIn();

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut();
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut();
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut();
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}

	});

})(jQuery);

/*------------------------ Form Submit ----------------------------- */




/*------------------------ Quantity Selector ----------------------------- */

$("button").on("click", function (ev) {
	var currentQty = $('input[name="quantity"]').val();
	var qtyDirection = $(this).data("direction");
	var newQty = 0;
	var maxQty = parseInt($('input[name="quantity"]').attr("data-max"), 10) || 0;

	if (qtyDirection == "1") {
	  newQty = parseInt(currentQty) + 1;
	} else if (qtyDirection == "-1") {
	  newQty = parseInt(currentQty) - 1;
	}

	// Enable the decrement button when the quantity is 2 or greater
	if (newQty >= 2) {
	  $(".decrement-quantity").removeAttr("disabled");
	} else if (newQty <= 1) {
	  $(".decrement-quantity").attr("disabled", "disabled");
	}

	// Check if the new quantity is within the allowed range (1 to maxQty)
	if (newQty >= 1 && newQty <= maxQty) {
	  newQty = newQty.toString();
	  $('input[name="quantity"]').val(newQty);
	} else if (newQty > maxQty) {
	  $('input[name="quantity"]').val(maxQty.toString());
	} else {
	  $('input[name="quantity"]').val("1");
	}
  });


  /* <----------------------- File Uploader -----------------------> */

  const fs = require('fs');
  const express = require('express');
  const multer = require('multer');
  const { google } = require('googleapis');
  const readline = require('readline');
  
  const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  const TOKEN_PATH = 'token.json';
  
  const upload = multer({ dest: 'uploads/' });
  const app = express();
  
  app.post('/upload', upload.array('myFiles'), (req, res, next) => {
	fs.readFile('credentials.json', (err, content) => {
	  if (err) return console.log('Error loading client secret file:', err);
	  authorize(JSON.parse(content), (auth) => uploadFiles(auth, req, res));
	});
  });
  
  app.listen(3000, () => {
	console.log('Server started on port 3000');
  });
  
  function authorize(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
	fs.readFile(TOKEN_PATH, (err, token) => {
	  if (err) return getNewToken(oAuth2Client, callback);
	  oAuth2Client.setCredentials(JSON.parse(token));
	  callback(oAuth2Client);
	});
  }
  
  function getNewToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
	  rl.close();
	  oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error('Error while trying to retrieve access token', err);
		oAuth2Client.setCredentials(token);
		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
		  if (err) console.error(err);
		  console.log('Token stored to', TOKEN_PATH);
		});
		callback(oAuth2Client);
	  });
	});
  }
  
  function uploadFiles(auth, req, res) {
	const drive = google.drive({ version: 'v3', auth });
	
	// Loop through all the uploaded files
	req.files.forEach((file, i) => {
	  var fileMetadata = {
		name: file.originalname,
	  };
	  var media = {
		mimeType: file.mimetype,
		body: fs.createReadStream(file.path),
	  };
	  drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: 'id',
	  }, function (err, file) {
		if (err) {
		  // Handle error
		  console.error(err);
		} else {
		  console.log('File Id: ', file.id);
		}
		if (i === req.files.length - 1) { // If it's the last file
		  res.send('Successfully uploaded!');
		}
	  });
	});
  }
  
  


