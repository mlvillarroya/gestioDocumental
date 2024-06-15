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

function createErnestLluchGroupEmail(groupName) {
  return stringConverter(groupName) + DOMINI_CORREU_PROFESSORS;
}

function createErnestLluchTeacherUsername(firstName, lastName) {
  return (stringConverter(firstName + lastName) + DOMINI_CORREU_PROFESSORS).toLowerCase();
}

function createErnestLluchStudentUsername(firstName, lastName, userType) {
  return (stringConverter(firstName + lastName) + DOMINI_CORREU_ALUMNES).toLowerCase();

}

function replaceAccents(textWithAccents) {
  return textWithAccents.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function stringConverter(textToConvert) {
    return replaceAccents(textToConvert.replace(/\s+/g, '_')
                        .toLowerCase());
}