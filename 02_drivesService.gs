function createSharedDrive(driveName) {
  if (createSharedDriveServiceAgent(driveName) == false) return false;
  return true;
}

function getSharedDrive(driveName) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  return sharedDrive;
}

function deleteSharedDrive(driveName) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  if (deleteDriveServiceAgent(sharedDrive.id) == false) return false;
  return true;
}

function setPermissionsOrganizerToUserInDrive(driveName, userEmail) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  if (setPermissionsToElementServiceAgent(sharedDrive.id, userEmail, DriveRoles.ORGANIZER) == false) return false;
  return true;
}

function setPermissionsWriterToUserInDrive(driveName, userEmail) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  if (setPermissionsToElementServiceAgent(sharedDrive.id, userEmail, DriveRoles.WRITER) == false) return false;
  return true;}

function setPermissionsReaderToUserInDrive(driveName, userEmail) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  if (setPermissionsToElementServiceAgent(sharedDrive.id, userEmail, DriveRoles.READER) == false) return false;
  return true;}

function getPermissionForUserInDrive(driveName, emailAddress) {
  let sharedDrive = getSharedDrive(driveName);
  if (sharedDrive == false) return false;
  let permissions = listPermissionsInElementServiceAgent(sharedDrive.id);
  for (let i=0; i<permissions.items.length; i++) {
    let permissionEmailAddress = permissions.items[i].emailAddress;
    if (permissionEmailAddress == emailAddress) return permissions.items[i];
  }
  return false;
}

function deletePermissionForUserInDrive(driveName, emailAddress) {
  let sharedDrive = getSharedDrive(driveName);
  if (sharedDrive == false) return false;
  let permission = getPermissionForUserInDrive(sharedDrive.name, emailAddress);
  if (permission == false) return false;
  if (deletePermissionInElementServiceAgent(sharedDrive.id, permission.id) == false) return false;
  return true;
}

function createFolderInSharedDrive(driveName, folderName) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive == false) return false;
  return createFolderServiceAgent(folderName, sharedDrive.id);
}  

function createFolderInFolder(parentFolderName, folderName) {
  let parentFolder = getFolderServiceAgent(parentFolderName);
  if (parentFolder == null) return null;
  return createFolderServiceAgent(folderName, parentFolder.id);
}

function getFolder(folderName) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  return folder;
}

function deleteFolder(folderName) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  if (deleteFolderServiceAgent(folder.id) == false) return false;
  return true;
}

function setPermissionsOrganizerToUserInFolder(folderName, userEmail) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  if (setPermissionsToElementServiceAgent(folder.id, userEmail, FileRoles.ORGANIZER) == false) return false;
  return true;
}

function setPermissionsWriterToUserInFolder(folderName, userEmail) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  if (setPermissionsToElementServiceAgent(folder.id, userEmail, FileRoles.WRITER) == false) return false;
  return true;
}

function setPermissionsReaderToUserInFolder(folderName, userEmail) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  if (setPermissionsToElementServiceAgent(folder.id, userEmail, FileRoles.READER) == false) return false;
  return true;
}

function getPermissionForUserInFolder(folderName, emailAddress) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  let permissions = listPermissionsInElementServiceAgent(folder.id);
  for (let i=0; i<permissions.items.length; i++) {
    let permissionEmailAddress = permissions.items[i].emailAddress;
    if (permissionEmailAddress == emailAddress) return permissions.items[i];
  }
  return false;
}

function deletePermissionForUserInFolder(folderName, emailAddress) {
  let folder = getFolderServiceAgent(folderName);
  if (folder == false) return false;
  let permission = getPermissionForUserInFolder(folder.title, emailAddress);
  if (permission == false) return false;
  if (deletePermissionInElementServiceAgent(folder.id, permission.id) == false) return false;
  return true;
}
