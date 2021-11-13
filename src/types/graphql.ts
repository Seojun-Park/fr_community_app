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
// GraphQL mutation operation: createReply
// ====================================================

export interface createReply_createReply_data {
  __typename: 'Reply';
  id: number;
}

export interface createReply_createReply {
  __typename: 'ReplyReturn';
  success: boolean;
  error: string | null;
  data: createReply_createReply_data | null;
}

export interface createReply {
  createReply: createReply_createReply;
}

export interface createReplyVariables {
  args: CreateReplyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteReply
// ====================================================

export interface deleteReply {
  deleteReply: boolean;
}

export interface deleteReplyVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleLike
// ====================================================

export interface toggleLike_toggleLike {
  __typename: 'LikeReturn';
  success: boolean;
  error: string | null;
}

export interface toggleLike {
  toggleLike: toggleLike_toggleLike;
}

export interface toggleLikeVariables {
  Id: number;
  type: string;
  UserId: number;
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
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_getMyProfile_data_Meets {
  __typename: 'Meet';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Rent {
  __typename: 'Rent';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Board {
  __typename: 'Board';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Market {
  __typename: 'Market';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Recruits {
  __typename: 'Recruit';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like_Boards {
  __typename: 'Board';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like_Rents {
  __typename: 'Rent';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like_Markets {
  __typename: 'Market';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like_Recruits {
  __typename: 'Recruit';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like_Meets {
  __typename: 'Meet';
  id: number;
  title: string;
  createdAt: string;
}

export interface getMyProfile_getMyProfile_data_Like {
  __typename: 'Like';
  Boards: getMyProfile_getMyProfile_data_Like_Boards[] | null;
  Rents: getMyProfile_getMyProfile_data_Like_Rents[] | null;
  Markets: getMyProfile_getMyProfile_data_Like_Markets[] | null;
  Recruits: getMyProfile_getMyProfile_data_Like_Recruits[] | null;
  Meets: getMyProfile_getMyProfile_data_Like_Meets[] | null;
}

export interface getMyProfile_getMyProfile_data {
  __typename: 'User';
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
  Meets: getMyProfile_getMyProfile_data_Meets[] | null;
  Rent: getMyProfile_getMyProfile_data_Rent[] | null;
  Board: getMyProfile_getMyProfile_data_Board[] | null;
  Market: getMyProfile_getMyProfile_data_Market[] | null;
  Recruits: getMyProfile_getMyProfile_data_Recruits[] | null;
  Like: getMyProfile_getMyProfile_data_Like;
}

export interface getMyProfile_getMyProfile {
  __typename: 'UserReturn';
  success: boolean;
  error: string | null;
  data: getMyProfile_getMyProfile_data | null;
}

export interface getMyProfile {
  getMyProfile: getMyProfile_getMyProfile;
}

export interface getMyProfileVariables {
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
  ChatId: number;
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
// GraphQL query operation: getBoard
// ====================================================

export interface getBoard_getBoard_data_Writer {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getBoard_getBoard_data_Replies_User {
  __typename: 'User';
  id: number;
  nickname: string;
}

export interface getBoard_getBoard_data_Replies {
  __typename: 'Reply';
  id: number;
  content: string;
  User: getBoard_getBoard_data_Replies_User;
}

export interface getBoard_getBoard_data_Likes {
  __typename: 'Like';
  id: number;
  OwnerId: number;
}

export interface getBoard_getBoard_data {
  __typename: 'Board';
  id: number;
  title: string;
  content: string;
  Writer: getBoard_getBoard_data_Writer;
  Replies: getBoard_getBoard_data_Replies[] | null;
  Likes: getBoard_getBoard_data_Likes[] | null;
  createdAt: string;
}

export interface getBoard_getBoard {
  __typename: 'BoardReturn';
  success: boolean;
  error: string | null;
  data: getBoard_getBoard_data | null;
}

export interface getBoard {
  getBoard: getBoard_getBoard;
}

export interface getBoardVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMarket
// ====================================================

export interface getMarket_getMarket_data {
  __typename: 'Market';
  id: number;
  title: string;
}

export interface getMarket_getMarket {
  __typename: 'MarketReturn';
  success: boolean;
  error: string | null;
  data: getMarket_getMarket_data | null;
}

export interface getMarket {
  getMarket: getMarket_getMarket;
}

export interface getMarketVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRent
// ====================================================

export interface getRent_getRent_data {
  __typename: 'Rent';
  id: number;
  title: string;
}

export interface getRent_getRent {
  __typename: 'RentReturn';
  success: boolean;
  error: string | null;
  data: getRent_getRent_data | null;
}

export interface getRent {
  getRent: getRent_getRent;
}

export interface getRentVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRecruit
// ====================================================

export interface getRecruit_getRecruit_data {
  __typename: 'Recruit';
  id: number;
  title: string;
}

export interface getRecruit_getRecruit {
  __typename: 'RecruitReturn';
  success: boolean;
  error: string | null;
  data: getRecruit_getRecruit_data | null;
}

export interface getRecruit {
  getRecruit: getRecruit_getRecruit;
}

export interface getRecruitVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMeet
// ====================================================

export interface getMeet_getMeet_data {
  __typename: 'Meet';
  id: number;
  title: string;
}

export interface getMeet_getMeet {
  __typename: 'MeetReturn';
  success: boolean;
  error: string | null;
  data: getMeet_getMeet_data | null;
}

export interface getMeet {
  getMeet: getMeet_getMeet;
}

export interface getMeetVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBoardsByCategory
// ====================================================

export interface getBoardsByCategory_getBoardsByCategory_data {
  __typename: 'Board';
  id: number;
  title: string;
  createdAt: string;
}

export interface getBoardsByCategory_getBoardsByCategory {
  __typename: 'BoardsReturn';
  success: boolean;
  error: string | null;
  data: getBoardsByCategory_getBoardsByCategory_data[] | null;
}

export interface getBoardsByCategory {
  getBoardsByCategory: getBoardsByCategory_getBoardsByCategory;
}

export interface getBoardsByCategoryVariables {
  category: string;
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

export interface CreateReplyInput {
  BoardId: number;
  UserId: number;
  content: string;
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
