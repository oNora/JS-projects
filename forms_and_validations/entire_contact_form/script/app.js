$(function() {

	var dropDownData;
	$.getJSON('script/subject.json', function(data) {
		dropDownData = data;
	}).done(function () {
		var optionsElement = '';
		var arrayLength = dropDownData.length;
		for (var i = 0; i < arrayLength; i++) {
			optionsElement += '<option value="' + dropDownData[i] + '">';
		}
		$('#languages').append(optionsElement);
	});

	$.validator.addMethod('email', function(value, element) {
		return this.optional(element) ||
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value);
	});
	$.validator.addMethod('fullname', function(value, element) {
		return this.optional(element) ||
				/^[a-zA-Z\s][a-zA-Z\s]{0,24}$/i.test(value);
	}, 'Your name can contain only letters');

	$('#ajax-contact').validate({
		rules: {
			email: 'required email',
			fullname: 'required fullname',
			subject: {
				minlength: 3,
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'We need your email address to contact you',
				email: 'Your email address must be in the format of name@domain\
						.com'
			}
		}
	});

	var form = $('#ajax-contact');
	var formMessages = $('#form-post-messages');

	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		var formData = $(form).serialize();
		$.post( 'mailer.php', formData )
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#fullname').val('');
			$('#email').val('');
			$('#message').val('');
			$('#subject').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message \
								could not be sent.');
			}
		});

	});

});