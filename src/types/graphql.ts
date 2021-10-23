/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login {
  __typename: 'TokenReturn';
  success: boolean;
  error: string | null;
  data: string | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_getUsers_data {
  __typename: 'User';
  id: number;
  firstName: string;
  lastName: string;
}

export interface getUsers_getUsers {
  __typename: 'UsersReturn';
  success: boolean;
  error: string | null;
  data: getUsers_getUsers_data[] | null;
}

export interface getUsers {
  getUsers: getUsers_getUsers;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser_data {
  __typename: 'User';
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
}

export interface getUser_getUser {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: getUser_getUser_data | null;
}

export interface getUser {
  getUser: getUser_getUser;
}

export interface getUserVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
