export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  EmailInput: any;
  EthAddressInput: any;
  EthAddressSignatureInput: any;
  HashtagInput: any;
  PasswordInput: any;
  TelegramIDInput: any;
  TelegramUsernameInput: any;
  TwitterIDInput: any;
  TwitterUsernameInput: any;
  Upload: any;
  UrlInput: any;
};

export type ActivityConnection = Connection & {
  __typename?: 'ActivityConnection';
  edges: Array<ActivityConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ActivityConnectionEdge = ConnectionEdge & {
  __typename?: 'ActivityConnectionEdge';
  createdAt: Scalars['Int'];
  cursor: Scalars['String'];
  node?: Maybe<Node>;
  payload: ActivityItemPayload;
};

export type ActivityConnectionInput = {
  pageInfo: PageInfoInput;
};

export type ActivityItemPayload = ActivityItem_UserPostedMessage | ActivityItem_UserVotedCommunity | ActivityItem_UserVotedMessage | ActivityItem_UserVotedUser | ActivityItem_UserWatchesCommunity | ActivityItem_UserWatchesUser;

export type ActivityItem_UserPostedMessage = {
  __typename?: 'ActivityItem_UserPostedMessage';
  message?: Maybe<Message>;
};

export type ActivityItem_UserVotedCommunity = {
  __typename?: 'ActivityItem_UserVotedCommunity';
  community?: Maybe<Community>;
  edge?: Maybe<VotersConnectionEdge>;
};

export type ActivityItem_UserVotedMessage = {
  __typename?: 'ActivityItem_UserVotedMessage';
  edge?: Maybe<VotersConnectionEdge>;
  message?: Maybe<Message>;
};

export type ActivityItem_UserVotedUser = {
  __typename?: 'ActivityItem_UserVotedUser';
  edge?: Maybe<VotersConnectionEdge>;
  user?: Maybe<User>;
};

export type ActivityItem_UserWatchesCommunity = {
  __typename?: 'ActivityItem_UserWatchesCommunity';
  community?: Maybe<Community>;
  edge?: Maybe<WatchersConnectionEdge>;
};

export type ActivityItem_UserWatchesUser = {
  __typename?: 'ActivityItem_UserWatchesUser';
  edge?: Maybe<WatchersConnectionEdge>;
  user?: Maybe<User>;
};

export type AddEthAddessPayload = {
  __typename?: 'AddEthAddessPayload';
  nonce: Scalars['String'];
};

export type AddEthAddressInput = {
  newEthAddress: Scalars['EthAddressInput'];
};

export type AddNotificationsWebhookInput = {
  url: Scalars['UrlInput'];
  userID: Scalars['ID'];
};

export type ClaimCommunityInput = {
  communityId: Scalars['ID'];
};

export type CommunitiesConnection = Connection & {
  __typename?: 'CommunitiesConnection';
  edges: Array<CommunitiesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommunitiesConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunitiesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Community>;
};

export type CommunitiesConnectionInput = {
  filterByPartner?: InputMaybe<Scalars['Boolean']>;
  filterByPublished?: InputMaybe<Scalars['Boolean']>;
  pageInfo: PageInfoInput;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: CommunitiesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export enum CommunitiesSortBy {
  CreatedAt = 'CREATED_AT',
  LatestUpdateAt = 'LATEST_UPDATE_AT',
  NetUpVotes = 'NET_UP_VOTES'
}

export type Community = Node & Votable & Watchable & {
  __typename?: 'Community';
  activity: CommunityActivityConnection;
  draftThreads: Array<CommunityDraftThreadsConnectionEdge>;
  externalLinks: Array<ExternalLink>;
  hashtags: CommunityHashtagsConnection;
  id: Scalars['ID'];
  logoUrl: Scalars['String'];
  mission: Scalars['String'];
  moderatedUsers: CommunityModeratedUsersConnection;
  name: Scalars['String'];
  partner: Scalars['Boolean'];
  postedMessages: CommunityPostedMessagesConnection;
  postedThread?: Maybe<CommunityPostedThreadConnectionEdge>;
  published: Scalars['Boolean'];
  slug: Scalars['String'];
  tagline: Scalars['String'];
  teamMembers: Array<CommunityTeamMembersConnectionEdge>;
  viewerTeamMemberRole?: Maybe<CommunityTeamMemberRole>;
  viewerVote?: Maybe<VotersConnectionEdge>;
  viewerWatches?: Maybe<ViewerWatchesCommunityConnectionEdge>;
  votesCount: VotesCount;
  watchers: WatchersConnection;
};


export type CommunityActivityArgs = {
  input?: InputMaybe<CommunityActivityConnectionInput>;
};


export type CommunityHashtagsArgs = {
  input: CommunityHashtagsConnectionInput;
};


export type CommunityModeratedUsersArgs = {
  input: CommunityModeratedUsersInput;
};


export type CommunityPostedMessagesArgs = {
  input: CommunityPostedMessagesConnectionInput;
};


export type CommunityPostedThreadArgs = {
  slug: Scalars['String'];
};


export type CommunityWatchersArgs = {
  input: WatchersConnectionInput;
};

export type CommunityActivityConnection = Connection & {
  __typename?: 'CommunityActivityConnection';
  edges: Array<CommunityActivityConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommunityActivityConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityActivityConnectionEdge';
  createdAt: Scalars['Int'];
  cursor: Scalars['String'];
  node?: Maybe<Node>;
  payload: CommunityActivityItemPayload;
};

export type CommunityActivityConnectionInput = {
  pageInfo: PageInfoInput;
};

export type CommunityActivityItemPayload = ActivityItem_UserPostedMessage | ActivityItem_UserVotedCommunity | ActivityItem_UserVotedMessage | ActivityItem_UserWatchesCommunity;

export enum CommunityCustomWatchOption {
  Announcements = 'ANNOUNCEMENTS',
  Threads = 'THREADS'
}

export type CommunityDraftThreadsConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityDraftThreadsConnectionEdge';
  cursor: Scalars['String'];
  messageSlug: Scalars['String'];
  node?: Maybe<Message>;
};

export type CommunityHashtagsConnection = Connection & {
  __typename?: 'CommunityHashtagsConnection';
  edges: Array<CommunityHashtagsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommunityHashtagsConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityHashtagsConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Hashtag>;
};

export type CommunityHashtagsConnectionInput = {
  pageInfo: PageInfoInput;
};

export type CommunityImportedUsersConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityImportedUsersConnectionEdge';
  cursor: Scalars['String'];
  email: Scalars['String'];
  importedAt: Scalars['Int'];
  importer?: Maybe<User>;
  node?: Maybe<User>;
  source: CommunityUserImportSource;
};

export type CommunityModeratedUsersConnection = Connection & {
  __typename?: 'CommunityModeratedUsersConnection';
  edges: Array<CommunityModeratedUsersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommunityModeratedUsersConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityModeratedUsersConnectionEdge';
  cursor: Scalars['String'];
  imported?: Maybe<CommunityImportedUsersConnectionEdge>;
  node?: Maybe<User>;
  watches?: Maybe<WatchersConnectionEdge>;
};

export type CommunityModeratedUsersInput = {
  pageInfo: PageInfoInput;
};

export type CommunityPostedMessagesConnection = Connection & {
  __typename?: 'CommunityPostedMessagesConnection';
  edges: Array<CommunityPostedMessagesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommunityPostedMessagesConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityPostedMessagesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type CommunityPostedMessagesConnectionInput = {
  filterByHashtags?: InputMaybe<Array<Scalars['HashtagInput']>>;
  filterByVotesStartingFrom?: InputMaybe<Scalars['Int']>;
  includeReplies?: InputMaybe<Scalars['Boolean']>;
  includeThreads?: InputMaybe<Scalars['Boolean']>;
  pageInfo: PageInfoInput;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: MessagesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export type CommunityPostedThreadConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityPostedThreadConnectionEdge';
  allParticipants: ThreadAllParticipantsConnection;
  allReplies?: Maybe<ThreadAllRepliesConnection>;
  cursor: Scalars['String'];
  messageSlug: Scalars['String'];
  node?: Maybe<Message>;
  viewsCount: Scalars['Int'];
};


export type CommunityPostedThreadConnectionEdgeAllParticipantsArgs = {
  input: ThreadAllParticipantsConnectionInput;
};


export type CommunityPostedThreadConnectionEdgeAllRepliesArgs = {
  input: ThreadAllRepliesConnectionInput;
};

export type CommunityTeamMemberInput = {
  email: Scalars['EmailInput'];
  /**
   * If null (no role), then remove user from the team;
   * if not null, then add into team with the role
   */
  role?: InputMaybe<CommunityTeamMemberRole>;
};

export enum CommunityTeamMemberRole {
  Member = 'MEMBER',
  Moderator = 'MODERATOR',
  Owner = 'OWNER'
}

export type CommunityTeamMembersConnectionEdge = ConnectionEdge & {
  __typename?: 'CommunityTeamMembersConnectionEdge';
  cursor: Scalars['String'];
  email: Scalars['String'];
  node?: Maybe<User>;
  role: CommunityTeamMemberRole;
};

export enum CommunityUserImportSource {
  CsvFile = 'CSV_FILE',
  EmailsList = 'EMAILS_LIST'
}

export enum CommunityWatchOption {
  IgnoreAll = 'IGNORE_ALL',
  WatchAll = 'WATCH_ALL',
  WatchCustom = 'WATCH_CUSTOM'
}

export type ConfirmEthAddressInput = {
  newEthAddress: Scalars['EthAddressInput'];
  signature: Scalars['EthAddressSignatureInput'];
};

export type ConfirmLoginWithEthAddressInput = {
  ethAddress: Scalars['EthAddressInput'];
  signature: Scalars['EthAddressSignatureInput'];
  userName?: InputMaybe<Scalars['String']>;
};

export type ConfirmLoginWithEthAddressPayload = {
  __typename?: 'ConfirmLoginWithEthAddressPayload';
  none?: Maybe<Scalars['Any']>;
};

export type Connection = {
  edges: Array<ConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Node>;
};

export type CreateAccountInput = {
  email: Scalars['EmailInput'];
  skipCreate?: InputMaybe<Scalars['Boolean']>;
};

export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  partialLoginToken: Scalars['String'];
};

export type CreateCommunityInput = {
  /** must provide website URL */
  externalLinks?: InputMaybe<Array<ExternalLinkInput>>;
  logo?: InputMaybe<Scalars['Upload']>;
  mission?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  tagline: Scalars['String'];
  teamMembers?: InputMaybe<Array<CommunityTeamMemberInput>>;
  viewerIsOwner?: InputMaybe<Scalars['Boolean']>;
};

export type CreateMessageInput = {
  authorID?: InputMaybe<Scalars['ID']>;
  authorIsCommunityID?: InputMaybe<Scalars['ID']>;
  body?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Boolean']>;
  hashtags?: InputMaybe<Array<Scalars['HashtagInput']>>;
  mentionedUsersIDs?: InputMaybe<Array<Scalars['ID']>>;
  postedInCommunityID?: InputMaybe<Scalars['ID']>;
  repliedToMessageID?: InputMaybe<Scalars['ID']>;
  skipEmail?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DeleteAccountInput = {
  token: Scalars['String'];
};

export type DeleteMessageInput = {
  messageId: Scalars['ID'];
};

export type DisableNotificationSettingsInput = {
  inMailCommunityStats?: InputMaybe<Scalars['Boolean']>;
  inMailDigest?: InputMaybe<Scalars['Boolean']>;
  inMailIndividual?: InputMaybe<Array<InMailIndividualNotificationType>>;
  userID: Scalars['ID'];
};

export type EmailLoginInput = {
  email: Scalars['EmailInput'];
};

export type EmailLoginPayload = {
  __typename?: 'EmailLoginPayload';
  partialLoginToken: Scalars['String'];
  passwordRequired: Scalars['Boolean'];
};

export type EmailResetPasswordInput = {
  email: Scalars['EmailInput'];
};

export type EmailUpdateEmailInput = {
  newEmail: Scalars['EmailInput'];
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  type: ExternalLinkType;
  url: Scalars['String'];
};

export type ExternalLinkInput = {
  type: ExternalLinkType;
  url: Scalars['String'];
};

export enum ExternalLinkType {
  AndroidApp = 'ANDROID_APP',
  Bitbucket = 'BITBUCKET',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Gitlab = 'GITLAB',
  Instagram = 'INSTAGRAM',
  IosApp = 'IOS_APP',
  Linkedin = 'LINKEDIN',
  Medium = 'MEDIUM',
  PrivacyPolicy = 'PRIVACY_POLICY',
  Reddit = 'REDDIT',
  Slack = 'SLACK',
  Telegram = 'TELEGRAM',
  TermsOfService = 'TERMS_OF_SERVICE',
  Twitter = 'TWITTER',
  Website = 'WEBSITE'
}

export type Hashtag = Node & {
  __typename?: 'Hashtag';
  id: Scalars['ID'];
  postedMessagesTotalCount: Scalars['Int'];
};

export type HashtagsConnection = Connection & {
  __typename?: 'HashtagsConnection';
  edges: Array<HashtagsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type HashtagsConnectionEdge = ConnectionEdge & {
  __typename?: 'HashtagsConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Hashtag>;
};

export type HashtagsConnectionInput = {
  pageInfo: PageInfoInput;
};

export type ImportUsersIntoCommunityInput = {
  communityId: Scalars['ID'];
  emailsCsvFile?: InputMaybe<Scalars['Upload']>;
  emailsList?: InputMaybe<Array<Scalars['EmailInput']>>;
};

export type ImportUsersIntoCommunityPayload = {
  __typename?: 'ImportUsersIntoCommunityPayload';
  failed: Scalars['Int'];
  skipped: Scalars['Int'];
  successful: Scalars['Int'];
  total: Scalars['Int'];
};

export enum InMailCommunityStatsNotificationInterval {
  Weekly = 'WEEKLY'
}

export type InMailCommunityStatsNotificationSettingInput = {
  interval?: InputMaybe<InMailCommunityStatsNotificationInterval>;
};

export type InMailCommunityStatsNotificationSettings = {
  __typename?: 'InMailCommunityStatsNotificationSettings';
  interval: InMailCommunityStatsNotificationInterval;
};

export enum InMailDigestNotificationInterval {
  Daily = 'DAILY'
}

export type InMailDigestNotificationSettingInput = {
  interval?: InputMaybe<InMailDigestNotificationInterval>;
};

export type InMailDigestNotificationSettings = {
  __typename?: 'InMailDigestNotificationSettings';
  interval: InMailDigestNotificationInterval;
};

export type InMailIndividualNotificationSettingInput = {
  enabled: Scalars['Boolean'];
  type: InMailIndividualNotificationType;
};

export enum InMailIndividualNotificationType {
  MyCommunitiesNewThreads = 'MY_COMMUNITIES_NEW_THREADS',
  WatchingCommunitiesNewAnnouncements = 'WATCHING_COMMUNITIES_NEW_ANNOUNCEMENTS',
  WatchingMessagesNewReplies = 'WATCHING_MESSAGES_NEW_REPLIES'
}

export type LoginAccount = {
  __typename?: 'LoginAccount';
  email: Scalars['String'];
  ethAddresses: Array<Scalars['String']>;
  passwordLogin: Scalars['Boolean'];
  telegramUsername: Scalars['String'];
  twitterUsername: Scalars['String'];
};

export type LoginInput = {
  token: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  none?: Maybe<Scalars['Any']>;
};

export type LoginWithEthAddressInput = {
  ethAddress: Scalars['EthAddressInput'];
};

export type LoginWithEthAddressPayload = {
  __typename?: 'LoginWithEthAddressPayload';
  nonce: Scalars['String'];
};

export type LoginWithPasswordInput = {
  email: Scalars['EmailInput'];
  password: Scalars['PasswordInput'];
};

export type LoginWithPasswordPayload = {
  __typename?: 'LoginWithPasswordPayload';
  none?: Maybe<Scalars['Any']>;
};

export type LoginWithTelegramInput = {
  telegramID: Scalars['TelegramIDInput'];
  telegramUsername: Scalars['TelegramUsernameInput'];
};

export type LoginWithTelegramPayload = {
  __typename?: 'LoginWithTelegramPayload';
  none?: Maybe<Scalars['Any']>;
};

export type LoginWithTwitterInput = {
  twitterID: Scalars['TwitterIDInput'];
  twitterUsername: Scalars['TwitterUsernameInput'];
};

export type LoginWithTwitterPayload = {
  __typename?: 'LoginWithTwitterPayload';
  none?: Maybe<Scalars['Any']>;
};

export type LogoutInput = {
  /**
   *  Possible values for sessionId:
   * - `empty` - logs out only current session
   * - `*` - logs out all sessions except current one
   * - `**` - logs out all sessions including current one
   * - `some session id` - logs out the specific session
   */
  sessionId: Scalars['String'];
};

export type Message = Node & Votable & Watchable & {
  __typename?: 'Message';
  author?: Maybe<User>;
  authorIsCommunity?: Maybe<Community>;
  body: Scalars['String'];
  createdAt: Scalars['Int'];
  deletedAt: Scalars['Int'];
  draft: Scalars['Boolean'];
  hashtags: Array<Scalars['String']>;
  id: Scalars['ID'];
  mentionedUsers: Array<Maybe<User>>;
  postedIn?: Maybe<MessagePostedInCommunityConnectionEdge>;
  publishedAt: Scalars['Int'];
  repliedTo?: Maybe<MessageRepliedToConnectionEdge>;
  replies: MessageRepliesConnection;
  title: Scalars['String'];
  updatedAt: Scalars['Int'];
  viewerVote?: Maybe<VotersConnectionEdge>;
  viewerWatches?: Maybe<ViewerWatchesMessageConnectionEdge>;
  voters: VotersConnection;
  votesCount: VotesCount;
  watchers: WatchersConnection;
};


export type MessageRepliesArgs = {
  input?: InputMaybe<MessageRepliesConnectionInput>;
};


export type MessageVotersArgs = {
  input: VotersConnectionInput;
};


export type MessageWatchersArgs = {
  input: WatchersConnectionInput;
};

export type MessagePostedInCommunity = {
  __typename?: 'MessagePostedInCommunity';
  message?: Maybe<Message>;
};

export type MessagePostedInCommunityConnectionEdge = ConnectionEdge & {
  __typename?: 'MessagePostedInCommunityConnectionEdge';
  allParticipants: ThreadAllParticipantsConnection;
  allReplies?: Maybe<ThreadAllRepliesConnection>;
  cursor: Scalars['String'];
  messageSlug: Scalars['String'];
  node?: Maybe<Community>;
  viewsCount: Scalars['Int'];
};


export type MessagePostedInCommunityConnectionEdgeAllParticipantsArgs = {
  input: ThreadAllParticipantsConnectionInput;
};


export type MessagePostedInCommunityConnectionEdgeAllRepliesArgs = {
  input: ThreadAllRepliesConnectionInput;
};

export type MessageRepliedToConnectionEdge = ConnectionEdge & {
  __typename?: 'MessageRepliedToConnectionEdge';
  cursor: Scalars['String'];
  inThread?: Maybe<Message>;
  node?: Maybe<Message>;
};

export type MessageRepliesConnection = Connection & {
  __typename?: 'MessageRepliesConnection';
  edges: Array<MessageRepliesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MessageRepliesConnectionEdge = ConnectionEdge & {
  __typename?: 'MessageRepliesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type MessageRepliesConnectionInput = {
  pageInfo: PageInfoInput;
  sortBy?: MessagesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export enum MessageWatchOption {
  WatchRepliesFromAllLevels = 'WATCH_REPLIES_FROM_ALL_LEVELS',
  WatchRepliesFromFirstLevel = 'WATCH_REPLIES_FROM_FIRST_LEVEL'
}

export enum MessagesSortBy {
  CreatedAt = 'CREATED_AT',
  NetUpVotes = 'NET_UP_VOTES'
}

export type Mutation = {
  __typename?: 'Mutation';
  addEthAddress?: Maybe<AddEthAddessPayload>;
  addNotificationsWebhook?: Maybe<Scalars['Any']>;
  claimCommunity?: Maybe<Community>;
  confirmEthAddress?: Maybe<Scalars['Any']>;
  confirmLoginWithEthAddress: ConfirmLoginWithEthAddressPayload;
  createAccount?: Maybe<CreateAccountPayload>;
  createCommunity?: Maybe<Community>;
  createMessage?: Maybe<Message>;
  createMessageAsAgent?: Maybe<Message>;
  deleteAccount?: Maybe<Scalars['Any']>;
  deleteMessage?: Maybe<Scalars['Any']>;
  disableNotificationSettings?: Maybe<Scalars['Any']>;
  emailDeleteAccount?: Maybe<Scalars['Any']>;
  emailLogin: EmailLoginPayload;
  emailResetPassword?: Maybe<Scalars['Any']>;
  emailUpdateEmail?: Maybe<Scalars['Any']>;
  importUsersIntoCommunity: ImportUsersIntoCommunityPayload;
  importUsersIntoCommunityAsAgent: ImportUsersIntoCommunityPayload;
  login: LoginPayload;
  loginWithEthAddress: LoginWithEthAddressPayload;
  loginWithPassword: LoginWithPasswordPayload;
  loginWithTelegram: LoginWithTelegramPayload;
  loginWithTwitter: LoginWithTwitterPayload;
  logout?: Maybe<Scalars['Any']>;
  removeEthAddress?: Maybe<Scalars['Any']>;
  removeNotificationsWebhook?: Maybe<Scalars['Any']>;
  removeTelegramLogin?: Maybe<Scalars['Any']>;
  removeTwitterLogin?: Maybe<Scalars['Any']>;
  resetPassword?: Maybe<Scalars['Any']>;
  transferMessage?: Maybe<Scalars['Any']>;
  updateCommunity?: Maybe<Community>;
  updateCommunityWatchOption?: Maybe<Scalars['Any']>;
  updateEmail?: Maybe<Scalars['Any']>;
  updateMessage?: Maybe<Message>;
  updateMessageAsAgent?: Maybe<Message>;
  updateMessageWatchOption?: Maybe<Scalars['Any']>;
  updateNotificationSettings?: Maybe<Scalars['Any']>;
  updateNotifications?: Maybe<Scalars['Any']>;
  updatePassword?: Maybe<Scalars['Any']>;
  updateProfile?: Maybe<User>;
  uploadFile?: Maybe<UploadFilePayload>;
  vote?: Maybe<Scalars['Any']>;
  watchUser?: Maybe<Scalars['Any']>;
};


export type MutationAddEthAddressArgs = {
  input: AddEthAddressInput;
};


export type MutationAddNotificationsWebhookArgs = {
  input: AddNotificationsWebhookInput;
};


export type MutationClaimCommunityArgs = {
  input: ClaimCommunityInput;
};


export type MutationConfirmEthAddressArgs = {
  input: ConfirmEthAddressInput;
};


export type MutationConfirmLoginWithEthAddressArgs = {
  input: ConfirmLoginWithEthAddressInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateMessageAsAgentArgs = {
  input: CreateMessageInput;
};


export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationDisableNotificationSettingsArgs = {
  input: DisableNotificationSettingsInput;
};


export type MutationEmailLoginArgs = {
  input: EmailLoginInput;
};


export type MutationEmailResetPasswordArgs = {
  input: EmailResetPasswordInput;
};


export type MutationEmailUpdateEmailArgs = {
  input: EmailUpdateEmailInput;
};


export type MutationImportUsersIntoCommunityArgs = {
  input: ImportUsersIntoCommunityInput;
};


export type MutationImportUsersIntoCommunityAsAgentArgs = {
  input: ImportUsersIntoCommunityInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginWithEthAddressArgs = {
  input: LoginWithEthAddressInput;
};


export type MutationLoginWithPasswordArgs = {
  input: LoginWithPasswordInput;
};


export type MutationLoginWithTelegramArgs = {
  input: LoginWithTelegramInput;
};


export type MutationLoginWithTwitterArgs = {
  input: LoginWithTwitterInput;
};


export type MutationLogoutArgs = {
  input: LogoutInput;
};


export type MutationRemoveEthAddressArgs = {
  input: RemoveEthAddressInput;
};


export type MutationRemoveNotificationsWebhookArgs = {
  input: RemoveNotificationsWebhookInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationTransferMessageArgs = {
  input: TransferMessageInput;
};


export type MutationUpdateCommunityArgs = {
  input: UpdateCommunityInput;
};


export type MutationUpdateCommunityWatchOptionArgs = {
  input: UpdateCommunityWatchOptionInput;
};


export type MutationUpdateEmailArgs = {
  input: UpdateEmailInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdateMessageAsAgentArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdateMessageWatchOptionArgs = {
  input: UpdateMessageWatchOptionInput;
};


export type MutationUpdateNotificationSettingsArgs = {
  input: UpdateNotificationSettingsInput;
};


export type MutationUpdateNotificationsArgs = {
  input: UpdateNotificationsInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUploadFileArgs = {
  input: UploadFileInput;
};


export type MutationVoteArgs = {
  input: VoteInput;
};


export type MutationWatchUserArgs = {
  input: WatchUserInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Notification = Node & {
  __typename?: 'Notification';
  archived: Scalars['Boolean'];
  createdAt: Scalars['Int'];
  id: Scalars['ID'];
  payload: NotificationPayload;
  read: Scalars['Boolean'];
  reason: NotificationReason;
};

export type NotificationPayload = MessagePostedInCommunity;

export enum NotificationReason {
  Replied = 'REPLIED',
  WatchingCommunity = 'WATCHING_COMMUNITY',
  WatchingParentMessage = 'WATCHING_PARENT_MESSAGE',
  WatchingThread = 'WATCHING_THREAD',
  WatchingUser = 'WATCHING_USER'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  inMailCommunityStats?: Maybe<InMailCommunityStatsNotificationSettings>;
  inMailDigest?: Maybe<InMailDigestNotificationSettings>;
  inMailIndividual: Array<InMailIndividualNotificationType>;
};

export type NotificationsConnection = Connection & {
  __typename?: 'NotificationsConnection';
  edges: Array<NotificationsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotificationsConnectionEdge = ConnectionEdge & {
  __typename?: 'NotificationsConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Notification>;
};

export type NotificationsConnectionInput = {
  filterByArchived?: InputMaybe<Scalars['Boolean']>;
  filterByRead?: InputMaybe<Scalars['Boolean']>;
  pageInfo: PageInfoInput;
};

export type NotificationsV2Connection = Connection & {
  __typename?: 'NotificationsV2Connection';
  edges: Array<NotificationsV2ConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotificationsV2ConnectionEdge = ConnectionEdge & {
  __typename?: 'NotificationsV2ConnectionEdge';
  cursor: Scalars['String'];
  events: NotificationsConnection;
  node?: Maybe<Node>;
};


export type NotificationsV2ConnectionEdgeEventsArgs = {
  input: NotificationsConnectionInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type PageInfoInput = {
  afterCursor?: InputMaybe<Scalars['String']>;
  beforeCursor?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PostedMessagesConnection = Connection & {
  __typename?: 'PostedMessagesConnection';
  edges: Array<PostedMessagesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostedMessagesConnectionEdge = ConnectionEdge & {
  __typename?: 'PostedMessagesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type PostedMessagesConnectionInput = {
  filterByHashtags?: InputMaybe<Array<Scalars['HashtagInput']>>;
  filterByVotesStartingFrom?: InputMaybe<Scalars['Int']>;
  includeReplies?: InputMaybe<Scalars['Boolean']>;
  includeThreads?: InputMaybe<Scalars['Boolean']>;
  pageInfo: PageInfoInput;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: MessagesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  activity: ActivityConnection;
  communities: CommunitiesConnection;
  community?: Maybe<Community>;
  hashtags: HashtagsConnection;
  message?: Maybe<Message>;
  postedMessages: PostedMessagesConnection;
  searchUsers: SearchUsersConnection;
  threadViews: Scalars['Int'];
  user?: Maybe<User>;
  viewer?: Maybe<Viewer>;
};


export type QueryActivityArgs = {
  input?: InputMaybe<ActivityConnectionInput>;
};


export type QueryCommunitiesArgs = {
  input: CommunitiesConnectionInput;
};


export type QueryCommunityArgs = {
  slug: Scalars['String'];
};


export type QueryHashtagsArgs = {
  input: HashtagsConnectionInput;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryPostedMessagesArgs = {
  input: PostedMessagesConnectionInput;
};


export type QuerySearchUsersArgs = {
  input: SearchUsersInput;
};


export type QueryThreadViewsArgs = {
  communityId: Scalars['ID'];
  threadId: Scalars['ID'];
};


export type QueryUserArgs = {
  slug: Scalars['String'];
};

export type RemoveEthAddressInput = {
  ethAddress: Scalars['EthAddressInput'];
};

export type RemoveNotificationsWebhookInput = {
  url: Scalars['UrlInput'];
  userID: Scalars['ID'];
};

export type ResetPasswordInput = {
  newPassword?: InputMaybe<Scalars['PasswordInput']>;
  skipReset?: InputMaybe<Scalars['Boolean']>;
  token: Scalars['String'];
};

export type SearchUsersConnection = Connection & {
  __typename?: 'SearchUsersConnection';
  edges: Array<SearchUsersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SearchUsersConnectionEdge = ConnectionEdge & {
  __typename?: 'SearchUsersConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type SearchUsersInput = {
  pageInfo: PageInfoInput;
  searchTerm: Scalars['String'];
};

export type ThreadAllParticipantsConnection = Connection & {
  __typename?: 'ThreadAllParticipantsConnection';
  edges: Array<ThreadAllParticipantsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadAllParticipantsConnectionEdge = ConnectionEdge & {
  __typename?: 'ThreadAllParticipantsConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type ThreadAllParticipantsConnectionInput = {
  pageInfo: PageInfoInput;
};

export type ThreadAllRepliesConnection = Connection & {
  __typename?: 'ThreadAllRepliesConnection';
  edges: Array<ThreadAllRepliesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadAllRepliesConnectionEdge = ConnectionEdge & {
  __typename?: 'ThreadAllRepliesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
  repliedAt: Scalars['Int'];
};

export type ThreadAllRepliesConnectionInput = {
  pageInfo: PageInfoInput;
  sortBy?: MessagesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export type TransferMessageInput = {
  communityId: Scalars['ID'];
  messageId: Scalars['ID'];
};

export type UpdateCommunityInput = {
  communityId: Scalars['ID'];
  externalLinks?: InputMaybe<Array<ExternalLinkInput>>;
  logo?: InputMaybe<UpdateCommunityLogoInput>;
  mission?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** auth: Agent only */
  partner?: InputMaybe<Scalars['Boolean']>;
  published?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  tagline?: InputMaybe<Scalars['String']>;
  teamMembers?: InputMaybe<Array<CommunityTeamMemberInput>>;
};

export type UpdateCommunityLogoInput = {
  file?: InputMaybe<Scalars['Upload']>;
  /** To remove logo, just send without any url and file */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCommunityWatchOptionInput = {
  communityId: Scalars['ID'];
  customOptions?: InputMaybe<Array<CommunityCustomWatchOption>>;
  option?: InputMaybe<CommunityWatchOption>;
};

export type UpdateEmailInput = {
  token: Scalars['String'];
};

export type UpdateMessageInput = {
  authorID?: InputMaybe<Scalars['ID']>;
  authorIsCommunityID?: InputMaybe<Scalars['ID']>;
  body?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Boolean']>;
  hashtags?: InputMaybe<Array<Scalars['HashtagInput']>>;
  id: Scalars['ID'];
  mentionedUsersIDs?: InputMaybe<Array<Scalars['ID']>>;
  skipEmail?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updateSlug?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateMessageWatchOptionInput = {
  messageId: Scalars['ID'];
  option?: InputMaybe<MessageWatchOption>;
};

export type UpdateNotificationSettingsInput = {
  inMailCommunityStats?: InputMaybe<InMailCommunityStatsNotificationSettingInput>;
  inMailDigest?: InputMaybe<InMailDigestNotificationSettingInput>;
  inMailIndividual?: InputMaybe<Array<InMailIndividualNotificationSettingInput>>;
};

export type UpdateNotificationsInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  notificationsIds: Array<Scalars['ID']>;
  read?: InputMaybe<Scalars['Boolean']>;
};

export type UpdatePasswordInput = {
  currentPassword?: InputMaybe<Scalars['PasswordInput']>;
  newPassword: Scalars['PasswordInput'];
};

export type UpdateProfileAvatarInput = {
  /** To remove avatar, just send without any file */
  file?: InputMaybe<Scalars['Upload']>;
};

export type UpdateProfileInput = {
  avatar?: InputMaybe<UpdateProfileAvatarInput>;
  name?: InputMaybe<Scalars['String']>;
  shortBio?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  /** auth: Agent only */
  userId?: InputMaybe<Scalars['ID']>;
  verified?: InputMaybe<Scalars['Boolean']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type UploadFileInput = {
  file: Scalars['Upload'];
};

export type UploadFilePayload = {
  __typename?: 'UploadFilePayload';
  url: Scalars['String'];
};

export type User = Node & Votable & Watchable & {
  __typename?: 'User';
  activity: UserActivityConnection;
  avatarUrl: Scalars['String'];
  communities: Array<UserCommunitiesConnectionEdge>;
  id: Scalars['ID'];
  name: Scalars['String'];
  postedMessages: UserPostedMessagesConnection;
  shortBio: Scalars['String'];
  slug: Scalars['String'];
  verified: Scalars['Boolean'];
  viewerVote?: Maybe<VotersConnectionEdge>;
  viewerWatches?: Maybe<ViewerWatchesUserConnectionEdge>;
  votesCount: VotesCount;
  watchers: WatchersConnection;
  watches: UserWatches;
  websiteUrl: Scalars['String'];
};


export type UserActivityArgs = {
  input?: InputMaybe<UserActivityConnectionInput>;
};


export type UserPostedMessagesArgs = {
  input?: InputMaybe<UserPostedMessagesConnectionInput>;
};


export type UserWatchersArgs = {
  input: WatchersConnectionInput;
};

export type UserActivityConnection = Connection & {
  __typename?: 'UserActivityConnection';
  edges: Array<UserActivityConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserActivityConnectionEdge = ConnectionEdge & {
  __typename?: 'UserActivityConnectionEdge';
  createdAt: Scalars['Int'];
  cursor: Scalars['String'];
  node?: Maybe<Node>;
  payload: UserActivityItemPayload;
};

export type UserActivityConnectionInput = {
  pageInfo: PageInfoInput;
};

export type UserActivityItemPayload = ActivityItem_UserPostedMessage | ActivityItem_UserVotedCommunity | ActivityItem_UserVotedMessage | ActivityItem_UserVotedUser | ActivityItem_UserWatchesCommunity | ActivityItem_UserWatchesUser;

export type UserCommunitiesConnectionEdge = ConnectionEdge & {
  __typename?: 'UserCommunitiesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Community>;
};

export type UserDraftThreadsConnectionEdge = ConnectionEdge & {
  __typename?: 'UserDraftThreadsConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type UserPostedMessagesConnection = Connection & {
  __typename?: 'UserPostedMessagesConnection';
  edges: Array<UserPostedMessagesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserPostedMessagesConnectionEdge = ConnectionEdge & {
  __typename?: 'UserPostedMessagesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type UserPostedMessagesConnectionInput = {
  includeCommunityAnnouncements?: InputMaybe<Scalars['Boolean']>;
  includeDrafts?: InputMaybe<Scalars['Boolean']>;
  includeReplies?: InputMaybe<Scalars['Boolean']>;
  includeThreads?: InputMaybe<Scalars['Boolean']>;
  pageInfo: PageInfoInput;
  sortBy?: MessagesSortBy;
  sortDesc?: InputMaybe<Scalars['Boolean']>;
};

export type UserWatches = {
  __typename?: 'UserWatches';
  communities: UserWatchesCommunitiesConnection;
  messages: UserWatchesMessagesConnection;
  users: UserWatchesUsersConnection;
};


export type UserWatchesCommunitiesArgs = {
  input: UserWatchesCommunitiesConnectionInput;
};


export type UserWatchesMessagesArgs = {
  input: UserWatchesMessagesConnectionInput;
};


export type UserWatchesUsersArgs = {
  input: UserWatchesUsersConnectionInput;
};

export type UserWatchesCommunitiesConnection = Connection & {
  __typename?: 'UserWatchesCommunitiesConnection';
  edges: Array<UserWatchesCommunitiesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserWatchesCommunitiesConnectionEdge = ConnectionEdge & {
  __typename?: 'UserWatchesCommunitiesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Community>;
};

export type UserWatchesCommunitiesConnectionInput = {
  pageInfo: PageInfoInput;
};

export type UserWatchesMessagesConnection = Connection & {
  __typename?: 'UserWatchesMessagesConnection';
  edges: Array<UserWatchesMessagesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserWatchesMessagesConnectionEdge = ConnectionEdge & {
  __typename?: 'UserWatchesMessagesConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type UserWatchesMessagesConnectionInput = {
  pageInfo: PageInfoInput;
};

export type UserWatchesUsersConnection = Connection & {
  __typename?: 'UserWatchesUsersConnection';
  edges: Array<UserWatchesUsersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserWatchesUsersConnectionEdge = ConnectionEdge & {
  __typename?: 'UserWatchesUsersConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserWatchesUsersConnectionInput = {
  pageInfo: PageInfoInput;
};

export type Viewer = {
  __typename?: 'Viewer';
  draftThreads: Array<UserDraftThreadsConnectionEdge>;
  intercomUserIdHash: Scalars['String'];
  loginAccount: LoginAccount;
  notification?: Maybe<Notification>;
  notificationSettings: NotificationSettings;
  notifications: NotificationsConnection;
  notificationsV2: NotificationsV2Connection;
  user: User;
};


export type ViewerNotificationArgs = {
  id: Scalars['ID'];
};


export type ViewerNotificationsArgs = {
  input: NotificationsConnectionInput;
};


export type ViewerNotificationsV2Args = {
  input: NotificationsConnectionInput;
};

export type ViewerWatchesCommunityConnectionEdge = ConnectionEdge & ViewerWatchesConnectionEdge & {
  __typename?: 'ViewerWatchesCommunityConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
  watchCustomOption?: Maybe<Array<CommunityCustomWatchOption>>;
  watchOption: CommunityWatchOption;
  watchesSince: Scalars['Int'];
};

export type ViewerWatchesConnectionEdge = {
  node?: Maybe<User>;
};

export type ViewerWatchesMessageConnectionEdge = ConnectionEdge & ViewerWatchesConnectionEdge & {
  __typename?: 'ViewerWatchesMessageConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
  watchOption: MessageWatchOption;
  watchesSince: Scalars['Int'];
};

export type ViewerWatchesUserConnectionEdge = ConnectionEdge & ViewerWatchesConnectionEdge & {
  __typename?: 'ViewerWatchesUserConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
  watchesSince: Scalars['Int'];
};

export type Votable = {
  viewerVote?: Maybe<VotersConnectionEdge>;
  votesCount: VotesCount;
};

export type VoteInput = {
  nodeId: Scalars['ID'];
  nodeType: VoteNodeType;
  voteType?: InputMaybe<VoteType>;
};

export enum VoteNodeType {
  Community = 'COMMUNITY',
  Message = 'MESSAGE',
  User = 'USER'
}

export enum VoteType {
  Down = 'DOWN',
  Up = 'UP'
}

export type VotersConnection = Connection & {
  __typename?: 'VotersConnection';
  edges: Array<VotersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VotersConnectionEdge = ConnectionEdge & {
  __typename?: 'VotersConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
  voteType: VoteType;
};

export type VotersConnectionInput = {
  pageInfo: PageInfoInput;
};

export type VotesCount = {
  __typename?: 'VotesCount';
  down: Scalars['Int'];
  up: Scalars['Int'];
};

export type WatchUserInput = {
  userId: Scalars['ID'];
  watch: Scalars['Boolean'];
};

export type Watchable = {
  viewerWatches?: Maybe<ViewerWatchesConnectionEdge>;
  watchers: WatchersConnection;
};


export type WatchableWatchersArgs = {
  input: WatchersConnectionInput;
};

export type WatchersConnection = Connection & {
  __typename?: 'WatchersConnection';
  edges: Array<WatchersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WatchersConnectionEdge = ConnectionEdge & {
  __typename?: 'WatchersConnectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
  watchesSince: Scalars['Int'];
};

export type WatchersConnectionInput = {
  pageInfo: PageInfoInput;
};
