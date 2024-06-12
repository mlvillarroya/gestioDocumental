function createFolderInSharedDrive(driveName, folderName) {
  let sharedDriveId = getSharedDrive(driveName);
  if (sharedDriveId == null) return null;
  return createFolder(folderName, sharedDriveId);
}  

function createFolderInFolder(parentFolderName, folderName) {
  let parentFolderId = getFolder(parentFolderName);
  if (parentFolderId == null) return null;
  return createFolder(folderName, parentFolderId);
}

function setPermissionToUserInFolder(folderName, userEmail, role) {
  let folderId = getFolder(folderName);
  if (folderId == null) return false;
  let permissionId = getPermissionForUserInDrive(folderId, userEmail);
  if (permissionId != null) {
    deletePermissionInElement(folderId, permissionId);
  };
  setPermissionsToElement(folderId, userEmail, role);
}

/*
// role could be 'organizer', 'writer', 'reader'
function setPermissionsToUserInDrive(driveName, userEmail, role) {
  let sharedDriveID = getSharedDrive(driveName);
  if (sharedDriveID == null) return false;
  let permissionId = getPermissionForUserInDrive(sharedDriveID, userEmail);
  if (permissionId != null) {
    deletePermissionInElement(sharedDriveID, permissionId);
  };
  setPermissionsToElement(sharedDriveID, userEmail, role);
}

function getPermissionForUserInDrive(driveId, emailAddress) {
  let permissions = listPermissionsInElement(driveId);
  for (let i=0; i<permissions.items.length; i++) {
    let permissionEmailAddress = permissions.items[i].emailAddress;
    if (permissionEmailAddress == emailAddress) return permissions.items[i].id;
  }
  return null;
}

function deletePermissionForUserInDriveWithName(driveName, emailAddress) {
  let shareDriveId = getSharedDrive(driveName);
  if (shareDriveId == null) return null;
  let permissionId = getPermissionForUserInDrive(shareDriveId, emailAddress);
  if (permissionId == null) return null;
  deletePermissionInElement(shareDriveId, permissionId);
}
*/