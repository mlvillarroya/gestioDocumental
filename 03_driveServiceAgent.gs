// SHARED DRIVES
//
// - CREATE SHARED DRIVE
// - GET SHARED DRIVE

function createSharedDriveServiceAgent(driveName) {
  let sharedDrive = getSharedDriveServiceAgent(driveName);
  if (sharedDrive != false) return false;
  var requestID = generateUUID();
  var resource = {
    name: driveName
  };
  try {
    return Drive.Drives.insert(resource, requestID);
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}

function getSharedDriveServiceAgent(driveName) {
  var query = 'name = "' + driveName + '"';
  var optionalArgs = { 
    q: query
  };
  try {
    var drivesList = Drive.Drives.list(optionalArgs);
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
  if (drivesList && drivesList.items.length > 0) return drivesList.items[0];
  return false;
}

function deleteDriveServiceAgent(driveId) {
  try {
    Drive.Drives.remove(driveId);
    return true;
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

// FOLDERS
//
// - CREATE FOLDER
// - GET FOLDER

function createFolderServiceAgent(folderName, parentObjectId) {
  var resource = {
    title: folderName,
    mimeType: "application/vnd.google-apps.folder",
    parents:[{
      "id": parentObjectId,
    }]
  };
  var optionalArgs = {
    supportsAllDrives: true
    };
  try {
    return Drive.Files.insert(resource, null, optionalArgs);
  }  
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}

function getFolderServiceAgent(folderName) {
  var query = 'mimeType = "application/vnd.google-apps.folder" AND title = "' + folderName + '"';
  var optionalArgs = { 
    q: query,
    supportsAllDrives: true,
    corpora: "allDrives",
    includeItemsFromAllDrives : true
  };
  try {
    var drivesList = Drive.Files.list(optionalArgs);
    if (drivesList.items.length > 0) return drivesList.items[0];
    return false;
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}

function deleteFolderServiceAgent(folderId) {
  try {
    var optionalArgs = { 
      supportsAllDrives: true,
      corpora: "allDrives",
      includeItemsFromAllDrives : true
    };
    Drive.Files.remove(folderId, optionalArgs);
    return true;
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

// PERMISSIONS
//
// - LIST PERMISSIONS IN ELEMENT
// - SET PERMISSIONS TO ELEMENT
// - DELETE PERMISSIONS IN ELEMENT

function listPermissionsInElementServiceAgent(elementId) {
  var optionalArgs = { 
    supportsAllDrives: true
    };
  try {
    return Drive.Permissions.list(elementId, optionalArgs);
    }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}

function setPermissionsToElementServiceAgent(elementId, userEmail, role) {
  var resource = {
    role: role,
    type: "user",
    value: userEmail,
  }
  // optional arguments to work on Shared drive
  var optionalArgs = {
    sendNotificationEmails: false,
    supportsAllDrives: true
  };
  try {
    Drive.Permissions.insert(resource, elementId, optionalArgs);
    return true;
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}

function deletePermissionInElementServiceAgent(elementId, permissionId) {
  var optionalArgs = { 
    supportsAllDrives: true
    };
  try {
    Drive.Permissions.remove(elementId, permissionId, optionalArgs);
    return true;
  }
  catch (err) {
    Logger.log(JSON.stringify(err));
    return false
  }
}