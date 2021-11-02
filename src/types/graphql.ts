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
// GraphQL mutation operation: verifyEmail
// ====================================================

export interface verifyEmail_verifyEmail_data {
  __typename: 'User';
  id: number;
}

export interface verifyEmail_verifyEmail {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: verifyEmail_verifyEmail_data | null;
}

export interface verifyEmail {
  verifyEmail: verifyEmail_verifyEmail;
}

export interface verifyEmailVariables {
  email: string;
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendNewCode
// ====================================================

export interface sendNewCode_sendNewCode_data {
  __typename: 'User';
  id: number;
}

export interface sendNewCode_sendNewCode {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: sendNewCode_sendNewCode_data | null;
}

export interface sendNewCode {
  sendNewCode: sendNewCode_sendNewCode;
}

export interface sendNewCodeVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendNewPassword
// ====================================================

export interface sendNewPassword_sendNewPassword_data {
  __typename: 'User';
  id: number;
}

export interface sendNewPassword_sendNewPassword {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: sendNewPassword_sendNewPassword_data | null;
}

export interface sendNewPassword {
  sendNewPassword: sendNewPassword_sendNewPassword;
}

export interface sendNewPasswordVariables {
  email: string;
  firstName: string;
  lastName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendDm
// ====================================================

export interface sendDm_sendDm_data {
  __typename: 'Dm';
  id: number;
  createdAt: string;
  content: string;
  ReceiverId: number | null;
  SenderId: number | null;
}

export interface sendDm_sendDm {
  __typename: 'DmReturn';
  success: boolean;
  error: string | null;
  data: sendDm_sendDm_data | null;
}

export interface sendDm {
  sendDm: sendDm_sendDm;
}

export interface sendDmVariables {
  args: CreateDmInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: outChat
// ====================================================

export interface outChat_outChat_data {
  __typename: 'Chat';
  id: number;
}

export interface outChat_outChat {
  __typename: 'ChatReturn';
  success: boolean;
  error: string | null;
  data: outChat_outChat_data | null;
}

export interface outChat {
  outChat: outChat_outChat;
}

export interface outChatVariables {
  userId: number;
  chatId: number;
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
  email: string;
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

// ====================================================
// GraphQL query operation: getChats
// ====================================================

export interface getChats_getChats_data_messages {
  __typename: 'Dm';
  id: number;
  content: string;
  SenderId: number | null;
  ReceiverId: number | null;
  createdAt: string;
}

export interface getChats_getChats_data_Members {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChats_getChats_data {
  __typename: 'Chat';
  id: number;
  messages: getChats_getChats_data_messages[] | null;
  Members: getChats_getChats_data_Members[];
}

export interface getChats_getChats {
  __typename: 'ChatsReturn';
  success: boolean;
  error: string | null;
  data: getChats_getChats_data[] | null;
}

export interface getChats {
  getChats: getChats_getChats;
}

export interface getChatsVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChat
// ====================================================

export interface getChat_getChat_data_messages_Sender {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChat_getChat_data_messages_Receiver {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChat_getChat_data_messages {
  __typename: 'Dm';
  createdAt: string;
  content: string;
  SenderId: number | null;
  ReceiverId: number | null;
  Sender: getChat_getChat_data_messages_Sender | null;
  Receiver: getChat_getChat_data_messages_Receiver | null;
}

export interface getChat_getChat_data_Members {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChat_getChat_data {
  __typename: 'Chat';
  messages: getChat_getChat_data_messages[] | null;
  Members: getChat_getChat_data_Members[];
}

export interface getChat_getChat {
  __typename: 'ChatReturn';
  success: boolean;
  error: string | null;
  data: getChat_getChat_data | null;
}

export interface getChat {
  getChat: getChat_getChat;
}

export interface getChatVariables {
  chatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChatMessages
// ====================================================

export interface getChatMessages_getChatMessages_data_Sender {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChatMessages_getChatMessages_data_Receiver {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getChatMessages_getChatMessages_data {
  __typename: 'Dm';
  createdAt: string;
  content: string;
  SenderId: number | null;
  ReceiverId: number | null;
  ChatId: number;
  Sender: getChatMessages_getChatMessages_data_Sender | null;
  Receiver: getChatMessages_getChatMessages_data_Receiver | null;
}

export interface getChatMessages_getChatMessages {
  __typename: 'DmsReturn';
  success: boolean;
  error: string | null;
  data: getChatMessages_getChatMessages_data[] | null;
}

export interface getChatMessages {
  getChatMessages: getChatMessages_getChatMessages;
}

export interface getChatMessagesVariables {
  ChatId: number;
  load: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkChatMember
// ====================================================

export interface checkChatMember_checkChatMember_data {
  __typename: 'Chat';
  id: number;
  Member1: number | null;
  Member2: number | null;
}

export interface checkChatMember_checkChatMember {
  __typename: 'ChatReturn';
  success: boolean;
  error: string | null;
  data: checkChatMember_checkChatMember_data | null;
}

export interface checkChatMember {
  checkChatMember: checkChatMember_checkChatMember;
}

export interface checkChatMemberVariables {
  chatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: dmSubscription
// ====================================================

export interface dmSubscription_dmSubscription {
  __typename: 'Dm';
  id: number;
  content: string;
  SenderId: number | null;
  ReceiverId: number | null;
  ChatId: number;
}

export interface dmSubscription {
  dmSubscription: dmSubscription_dmSubscription;
}

export interface dmSubscriptionVariables {
  ChatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: memberOut
// ====================================================

export interface memberOut_memberOut {
  __typename: 'ChatOutReturn';
  chatId: number;
  userId: number;
}

export interface memberOut {
  memberOut: memberOut_memberOut;
}

export interface memberOutVariables {
  chatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getDm
// ====================================================

export interface getDm_getDm {
  __typename: 'Dm';
  id: number;
  ReceiverId: number | null;
  SenderId: number | null;
  content: string;
  ChatId: number;
}

export interface getDm {
  getDm: getDm_getDm;
}

export interface getDmVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateDmInput {
  content: string;
  ChatId?: number | null;
  SenderId: number;
  ReceiverId: number;
}

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
