// role could be 'organizer', 'writer', 'reader'
function setPermissionsToUserInDrive(driveName, userEmail, role) {
  let sharedDrive = getSharedDrive(driveName);
  if (sharedDrive == false) return false;
  setPermissionsToElement(sharedDrive.id, userEmail, role);
}

function getPermissionForUserInDrive(driveId, emailAddress) {
  let permissions = listPermissionsInElement(driveId);
  for (let i=0; i<permissions.items.length; i++) {
    let permissionEmailAddress = permissions.items[i].emailAddress;
    if (permissionEmailAddress == emailAddress) return permissions.items[i];
  }
  return false;
}

function deletePermissionForUserInDriveWithName(driveName, emailAddress) {
  let shareDrive = getSharedDrive(driveName);
  if (shareDrive == false) return false;
  let permission = getPermissionForUserInDrive(shareDrive.id, emailAddress);
  if (permission == false) return false;
  deletePermissionInElement(shareDrive, permission.id);
}

function addGroupMemberWithGroupName(groupName, userEmail) {
  let group = getGroup(groupName);
  if (group == false) return false;
  let user = getUser(userEmail);
  if (user == false) return false;
  if (!addGroupMember(group.email, userEmail)) return false;
  return true;
}

function deleteGroupMemberWithGroupNameAndMemberEmail(groupName, userEmail) {
  let group = getGroup(groupName);
  if (group == false) return false;
  let user = getUser(userEmail);
  if (user == false) return false;
  if (!deleteGroupMember(group.email, userEmail)) return false;
  return true;  
}

function deleteGroupWithGroupName(groupName) {
  let group = getGroup(groupName);
  if (group == false) return false; 
  if (!deleteGroup(group.id)) return false;
  return true;
}