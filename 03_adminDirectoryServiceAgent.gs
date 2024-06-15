// USERS
//
// https://developers.google.com/apps-script/advanced/admin-sdk-directory
// - GET USER
// - CREATE USER
// - DELETE USER

function getUserServiceAgent(userEmail) {
  try {
    const user = AdminDirectory.Users.get(userEmail);
    return user;
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function addUserServiceAgent(firstName, lastName, userName, password, orgUnitPath=null) {
  let user = {
    primaryEmail: userName,
    name: {
      givenName: firstName,
      familyName: lastName,
    },
    password: password,
    orgUnitPath: orgUnitPath,
  };
  try {
    return AdminDirectory.Users.insert(user);
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function deleteUserServiceAgent(userId) {
  try {
    AdminDirectory.Users.remove(userId);
    return true;
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

// GROUPS
//
// https://developers.google.com/apps-script/advanced/admin-sdk-directory
// https://developers.google.com/admin-sdk/directory/reference/rest
// - Create group
// - Get group
// - Add member
// - Delete member
// - Delete group

function createGroupServiceAgent(groupName, groupEmail) {
  let group = {
  "email": groupEmail,
  "name": groupName,
  "adminCreated": true,
}
  try {
    return AdminDirectory.Groups.insert(group);
  } catch(err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function deleteGroupServiceAgent(groupId) {
  try {
    AdminDirectory.Groups.remove(groupId);
    return true;
  } catch(err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function getGroupServiceAgent(groupName, domain) {
  let query = "name='" + groupName + "'";
  let optionalArgs = {
    domain: domain,
    maxResults: 1,
    query: query,
    viewType: 'domain_public',
    projection: 'full'
  }
  try {
    var groups = AdminDirectory.Groups.list(optionalArgs).groups;
  } 
  catch(err) {
    Logger.log(JSON.stringify(err));
  }
  if (groups && groups.length > 0) return groups[0];
  return false;
}

function addGroupMemberServiceAgent(groupEmail, userEmail) {
  const member = {
    email: userEmail,
    role: 'MEMBER'
  };
  try {
    AdminDirectory.Members.insert(member, groupEmail);
    return true;
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function deleteGroupMemberServiceAgent(groupEmail, userId) {
  try {
    AdminDirectory.Members.remove(groupEmail, userId);
    return true;
  } catch(err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}