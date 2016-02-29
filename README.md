Description
=====================
**Note:** This repository has the following structure:

###1. `vendors`

Common libraries for other folders.

###2. `upload_drag_and_drop.html`

Upload file with drag and drop area using The HTML5 FileReader API and  show preview of the file under drag and drop area. Works for plain text (.txt files) with Latin letters and images (.png, .jpg, .ico )
<br /> Demo link http://onora.github.io/forms_and_validations/upload_drag_and_drop.html

###3. `entire_contact_form`

Sample of contact form.
- using   `jquery.validate`  for validating form before sending, until user still writing.
- using `HTML5  <datalist>` tag for subject inpit to provide an "autocomplete" with options generating from `.json` (subject.json )
-  `mailer.php`  - get post from contact form and sent an answer to client's side
-  `style.css`  - fancy validation styles  and pretty form

<br /> Demo link http://onora.github.io/forms_and_validations/entire_contact_form/

###4. `registration_form_with_validation`

Registration form with validation:

  a) using   `jquery.validate`  for validating form before sending registration data
  
  b) validation for :
   - name ,
   - mail,
   - user name,
   - birthday (you must have 18 years or older ) ,
   - password and confirm password

<br /> Demo link http://onora.github.io/forms_and_validations/registration_form_with_validation/