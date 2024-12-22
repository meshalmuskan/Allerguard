const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const name_input = document.getElementById('name-input'); // Added for Contact Us form
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const message_input = document.getElementById('message-input'); // Added for Contact Us form
const error_message = document.getElementById('error-message');
const phone_input = document.getElementById('phone-input');
const subject_input = document.getElementById('subject-input');
form.addEventListener('submit', (e) => {
  let errors = [];

  if (name_input && message_input) {
    // If we detect the name and message inputs, assume it's the Contact Us form
    errors = getContactFormErrors(name_input.value, email_input.value,subject_input.value ,message_input.value);
  } else if (firstname_input) {
    // Signup form
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      phone_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    //Login form
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else {
    // show a success alert
    console.log("Form submitted successfully!");
  }
});

// Validation for Contactform
function getContactFormErrors(name, email,subject, message) {
  let errors = [];

  if (name === "" || name == null) {
    errors.push("Full name is required");
    name_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email format");
    email_input.parentElement.classList.add("incorrect");
  }
  if (subject === "" || subject == null) {
    errors.push("Subject cannot be empty");
    subject_input.parentElement.classList.add("incorrect");
  }
  if (message === "" || message == null) {
    errors.push("Message cannot be empty");
    message_input.parentElement.classList.add("incorrect");
  }
  if (message.length < 10) {
    errors.push("Message must be at least 10 characters long");
    message_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Validation for Signup form
function getSignupFormErrors(firstname, email, phone, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email format");
    email_input.parentElement.classList.add("incorrect");
  }
  if (phone === "" || phone == null) {
    errors.push("Phone number is required");
    phone_input.parentElement.classList.add("incorrect");
  }
  if (phone.length < 11 || phone.length > 11) {
    errors.push("Incorrect phone number");
    phone_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Validation for Login form
function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email format");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Reset validation errors on input
const allInputs = [
  name_input,
  firstname_input,
  email_input,
  phone_input,
  password_input,
  subject_input,
  repeat_password_input,
  message_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

// Email validation regex
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
