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
  token: string | null;
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
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_data {
  __typename: 'User';
  id: number;
}

export interface createUser_createUser {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: createUser_createUser_data | null;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  args: CreateUserInput;
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

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_getMe_data {
  __typename: 'User';
  id: number;
  verified: boolean;
  verifiedCode: string | null;
}

export interface getMe_getMe {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: getMe_getMe_data | null;
}

export interface getMe {
  getMe: getMe_getMe;
}

export interface getMeVariables {
  token: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
