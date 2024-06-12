// SHARED DRIVES
//
// - CREATE SHARED DRIVE
// - GET SHARED DRIVE

function createSharedDrive(driveName) {
  if (getSharedDrive(driveName) != null) return false;
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

function getSharedDrive(driveName) {
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

// FOLDERS
//
// - CREATE FOLDER
// - GET FOLDER

function createFolder(folderName, parentObjectId) {
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

function getFolder(folderName) {
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

// PERMISSIONS
//
// - LIST PERMISSIONS IN SHARED DRIVE
// - SET PERMISSIONS TO SHARED DRIVE
// - DELETE PERMISSIONS IN SHARED DRIVE

function listPermissionsInElement(elementId) {
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

function setPermissionsToElement(elementId, userEmail, role) {
  if (!(variableInEnum(role, DriveRoles))) {
    return false;
  }
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

function deletePermissionInElement(elementId, permissionId) {
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