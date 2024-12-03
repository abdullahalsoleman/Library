// Show or hide details row
function showDetails(checkbox, detailsId) {
  const detailsRow = $("#" + detailsId); 
  detailsRow.css("display", checkbox.checked ? "table-row" : "none");
}

// Show form with selected books
function showForm() {
  const selectedBooks = $('input[type="checkbox"]:checked'); 
  const bookList = $('#book-list'); 
  const totalPriceElement = $('#total-price'); 

  if (selectedBooks.length > 0) {
    bookList.empty(); 
    let totalPrice = 0;

    selectedBooks.each(function () {
      const row = $(this).closest('tr'); 
      const title = row.find('td:nth-child(3)').text(); 
      const priceText = row.find('td:nth-child(4)').text(); 
      const price = parseInt(priceText.replace(/[^\d]/g, '')); 

      // Create and append list item
      const listItem = $('<li></li>').text(`${title} - ${price} ل.س`);
      bookList.append(listItem);

      totalPrice += price;
    });

    totalPriceElement.text(totalPrice); // Set the total price text

    $('#form-container').css("display", "block"); // Show the form using jQuery
  } else {
    alert('الرجاء اختيار كتاب أولاً');
  }
}

// Form validation and submission
$('#userForm').on('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const form = $(this); // jQuery reference to the form
  let isValid = true;

  // Clear all error messages
  $('.error-message').text('');

  // Validate full name
  const fullName = form.find('[name="fullName"]');
  const fullNameError = $('#fullNameError');
  if (!fullName[0].checkValidity()) {
    fullNameError.text('يرجى إدخال اسم كامل بالأحرف العربية فقط');
    isValid = false;
  }

  // Validate national ID
  const nationalId = form.find('[name="nationalId"]');
  const nationalIdError = $('#nationalIdError');
  if (!nationalId[0].checkValidity()) {
    nationalIdError.text('يجب أن يحتوي الرقم الوطني على 11 خانة فقط');
    isValid = false;
  }

  // Validate birth date
  const birthDate = form.find('[name="birthDate"]');
  const birthDateError = $('#birthDateError');
  if (!birthDate[0].checkValidity()) {
    birthDateError.text('يرجى إدخال تاريخ الولادة');
    isValid = false;
  }

  // Validate mobile number
  const mobileNumber = form.find('[name="mobileNumber"]');
  const mobileNumberError = $('#mobileNumberError');
  if (!mobileNumber[0].checkValidity()) {
    mobileNumberError.text('يرجى إدخال رقم موبايل صحيح يبدأ بـ 09 ومؤلف من 10 خانات');
    isValid = false;
  }

  // Validate email
  const email = form.find('[name="email"]');
  const emailError = $('#emailError');
  if (!email[0].checkValidity()) {
    emailError.text('يرجى إدخال بريد إلكتروني صالح');
    isValid = false;
  }

  // If all fields are valid, show alert and reset form
  if (isValid) {
    alert(`تم إرسال البيانات بنجاح!\n\nالاسم: ${fullName.val()}\nالرقم الوطني: ${nationalId.val()}\nتاريخ الولادة: ${birthDate.val()}\nرقم الموبايل: ${mobileNumber.val()}\nالبريد الإلكتروني: ${email.val()}`);
    form[0].reset();
    $('#form-container').css("display", "none"); 
  } else {
    alert('الرجاء تصحيح الأخطاء قبل الإرسال');
  }
});
