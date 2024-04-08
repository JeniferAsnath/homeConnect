export const validateSignup = (name, phone, email, password) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Name is required';
  }

  if (!phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d+$/.test(phone)) { // Check for digits only
    errors.phone = 'Invalid phone number (digits only)';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) { // Check for valid email format
    errors.email = 'Invalid email address';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};