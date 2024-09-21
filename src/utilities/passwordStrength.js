export const calculateStrength = (password) => {
  let strength = 0;

  if (password?.length >= 6) strength += 1; // Minimum length
  if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
  if (/[a-z]/.test(password)) strength += 1; // Lowercase letter
  if (/\d/.test(password)) strength += 1; // Numeric digit
  if (/[@$!%*?&]/.test(password)) strength += 1; // Special character

  return strength;
};

export const getStrengthLevel = (strength) => {
  switch (strength) {
    case 1:
      return { label: "Very Weak", color: "bg-red-500" };
    case 2:
      return { label: "Weak", color: "bg-orange-500" };
    case 3:
      return { label: "Moderate", color: "bg-yellow-500" };
    case 4:
      return { label: "Strong", color: "bg-green-500" };
    case 5:
      return { label: "Very Strong", color: "bg-green-700" };
    default:
      return { label: "Too Short", color: "bg-gray-300" };
  }
};
