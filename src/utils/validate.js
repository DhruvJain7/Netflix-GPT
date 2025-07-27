export const checkValidData = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,20}$)/.test(
      password
    );
  const isNameValid = /^[a-zA-Z\s]+$/.test(name);

  if (!isEmailValid) return 'Email is not Valid.';
  if (!isPasswordValid) return 'Password is not Valid.';
  if (!isNameValid) return 'Name is not Valid.';
  return null;
};
