$(document).ready(function() {
	setDateinfo();

	$.validator.addMethod("email", function(value, element) {
		return this.optional(element) ||
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value);
	});
	$.validator.addMethod("check_date_of_birth", function(value, element) {
		
		// transforms months from strings to numbers
		var parsMonths = {
			January: 1,
			February: 2,
			March: 3,
			April: 4,
			May: 5,
			June: 6,
			July: 7,
			August: 8,
			September: 9,
			October: 10,
			November: 11,
			December: 12
		},
			day = $("#dob_day").val();
			month = $("#dob_month").val();
			year = $("#dob_year").val();
			age =  18;

		var	mydate = new Date();
		mydate.setFullYear(year, parsMonths[month] -1, day);

		var currdate = new Date();
		currdate.setFullYear(currdate.getFullYear() - age);
		return currdate > mydate;

	}, "You must be at least 18 years of age.");

	$("#ajax-contact").validate({
		rules: {
			email: "required email",
			fname: {
				minlength: 2,
				required: true
			},
			lname: {
				minlength: 2,
				required: true
			},
			userName: {
				minlength: 3,
				required: true
			},
			password : {
				minlength : 5,
				required: true
			},
			password_confirm : {
				minlength : 5,
				required: true,
				equalTo : "#password"
			},
			dob_day: {
				check_date_of_birth: true,
				required: true
			},
			dob_month: {
				check_date_of_birth: true,
				required: true
			},
			dob_year: {
				check_date_of_birth: true,
				required: true
			}
		},
		groups: {
			DateofBirth: "dob_day dob_month dob_year"
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "dob_day"
				|| element.attr("name") == "dob_month"
				|| element.attr("name") == "dob_year") {
				error.insertAfter("#dob_year");
			} else {
				error.insertAfter(element);
			}
		},
			messages: {
			fname: "Please specify your first name",
			lname: "Please specify your last name too",
			email: {
				required: "We need your email address to contact you",
				email: "Your email address must be in the format of name@domain\
						.com"
			},
			dob_year: 'These fields are required'
		},
		errorClass: 'errorRow',
	    validClass: 'correctRow',
	    highlight: function(element, errorClass, validClass) {
	        $(element).closest('div.field').removeClass(validClass).addClass(errorClass);
	    },
	    unhighlight: function(element, errorClass, validClass) {
	        $(element).closest('div.field').removeClass(errorClass).addClass(validClass);
	    }
	});
});


function setDateinfo() {
	var months = ['January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November',
					'December'],
		days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
		
		// to show only relevant years - between 18 years old and 90 years old
		currentYear = (new Date().getFullYear()) - 18,
		currentMonth = new Date().getMonth(),
		currentDay = new Date().getDate(),
		dataYears = currentYear - 90,

		monthsSource = '<option value="{{months}}">{{months}}</option>',
		templateMonths = Handlebars.compile(monthsSource),
		optionWithMonths,

		daysSource = '<option value="{{day}}">{{day}}</option>',
		templateDays = Handlebars.compile(daysSource),
		optionWithDays,

		yearSource = '<option value="{{year}}">{{year}}</option>',
		templateYear = Handlebars.compile(yearSource),
		optionWithYear = '';


	for (var i = 0, m = months.length ; i < m; i++) {
		var monthsData = {'months': months[i]};
		optionWithMonths += templateMonths(monthsData);
	}
	$('#dob_month').append(optionWithMonths);


	for (var y = 0, d = days.length ; y < d; y++) {
		var daysData = {'day': days[y]};
		optionWithDays += templateDays(daysData);
	}
	$('#dob_day').append(optionWithDays);

	var setYearsParam = currentYear;
	for(setYearsParam; setYearsParam > (dataYears - 1); setYearsParam--) {
		var yearData = {'year': setYearsParam};
		optionWithYear += templateYear(yearData);
	}
	$('#dob_year').append(optionWithYear);
}