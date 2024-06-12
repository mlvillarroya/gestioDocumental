// USERS
//
// https://developers.google.com/apps-script/advanced/admin-sdk-directory
// - GET USER
// - CREATE USER
// - DELETE USER

function getUser(userEmail) {
  try {
    const user = AdminDirectory.Users.get(userEmail);
    return user;
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function addUser(firstName, lastName, userType, orgUnitPath=null) {
  if (!(variableInEnum(userType, UserTypes))) {
    return false;
  }
  let userName = createUserName(firstName, lastName, userType);
  if (orgUnitPath == null) orgUnitPath = getOrgUnit(userType);
  if (!userName) return false;
  let user = {
    primaryEmail: userName,
    name: {
      givenName: firstName,
      familyName: lastName,
    },
    password: DEFAULT_PASSWORD,
    orgUnitPath: orgUnitPath,
  };
  try {
    return AdminDirectory.Users.insert(user);
  } catch (err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function deleteUser(userId) {
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

function createGroup(groupName) {
  let group = {
  "email": stringConverter(groupName) + "@iernestlluch.cat",
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

function deleteGroup(groupId) {
  try {
    AdminDirectory.Groups.remove(groupId);
    return true;
  } catch(err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}

function getGroup(groupName) {
  let query = "name='" + groupName + "'";
  let optionalArgs = {
    domain: 'iernestlluch.cat',
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

function addGroupMember(groupEmail, userEmail) {
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

function deleteGroupMember(groupEmail, userId) {
  try {
    AdminDirectory.Members.remove(groupEmail, userId);
    return true;
  } catch(err) {
    Logger.log(JSON.stringify(err));
    return false;
  }
}