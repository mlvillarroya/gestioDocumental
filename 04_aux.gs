function replaceAccents(textWithAccents) {
  return textWithAccents.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function variableInEnum(variable, myEnum) {
  for (var value in myEnum) {
    enumValue = myEnum[value];
    if (variable == enumValue) return true;
  }
  return false;
}

function generateUUID() {
  return Utilities.getUuid();
}

function createUserName(firstName, lastName, userType) {
  if (userType == UserTypes.TEACHER) {
    return (replaceAccents(firstName + lastName) + DOMINI_CORREU_PROFESSORS).toLowerCase();
  }
  else if (userType == UserTypes.STUDENT) {
    return (replaceAccents(firstName + lastName) + DOMINI_CORREU_ALUMNES).toLowerCase();
  }
  else return false;
}

function getOrgUnit(userType) {
  if (userType == UserTypes.TEACHER) {
    return ORG_UNIT_TEACHERS;
  }
  else if (userType == UserTypes.STUDENT) {
    return ORG_UNIT_NEW_STUDENTS;
  }
  else return false;
}

function stringConverter(textToConvert) {
    return textToConvert.replace(/\s+/g, '_')
                        .replace(/[.,;:]/g, '')
                        .replace(/[áäâà]/g, 'a')
                        .replace(/[éëêè]/g, 'e')
                        .replace(/[íïîì]/g, 'i')
                        .replace(/[óöôò]/g, 'o')
                        .replace(/[úüûù]/g, 'u')
                        .toLowerCase();
}