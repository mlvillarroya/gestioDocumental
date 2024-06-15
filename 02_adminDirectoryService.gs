function createUserTeacher(firstName, lastName) {
  let userName = createErnestLluchTeacherUsername(firstName, lastName);
  let password = ERNEST_LLUCH_DEFAULT_TEACHER_PASSWORD;
  let orgUnitPath = ORG_UNIT_TEACHERS;
  if (addUserServiceAgent(firstName, lastName, userName, password, orgUnitPath) == false) return false;
  return true;
}

function createGroup(groupName) {
  let email = createErnestLluchGroupEmail(groupName);
  if (createGroupServiceAgent(groupName, email) == false) return false;
  return true;
}

function addGroupMemberWithGroupName(groupName, userEmail) {
  let group = getGroupServiceAgent(groupName, DOMINI);
  if (group == false) return false;
  let user = getUserServiceAgent(userEmail);
  if (user == false) return false;
  if (!addGroupMemberServiceAgent(group.email, userEmail)) return false;
  return true;
}

function deleteGroupMemberWithGroupNameAndMemberEmail(groupName, userEmail) {
  let group = getGroupServiceAgent(groupName, DOMINI);
  if (group == false) return false;
  let user = getUserServiceAgent(userEmail);
  if (user == false) return false;
  if (!deleteGroupMemberServiceAgent(group.email, userEmail)) return false;
  return true;  
}

function deleteGroupWithGroupName(groupName) {
  let group = getGroupServiceAgent(groupName, DOMINI);
  if (group == false) return false; 
  if (!deleteGroupServiceAgent(group.id)) return false;
  return true;
}

function deleteUserTeacher(userEmail) {
  let user = getUserServiceAgent(userEmail);
  if (user == false) return false;
  if (deleteUserServiceAgent(user.id) == false) return false;
  return true;
}