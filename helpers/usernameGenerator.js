const generateUsername = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return "Invalid";
  }

  const formattedFirstName = firstName.substring(0, 3).toLowerCase();
  const formattedLastName = lastName.substring(0, 3).toLowerCase();

  return `${formattedFirstName}_${formattedLastName}`;
};

module.exports = generateUsername;