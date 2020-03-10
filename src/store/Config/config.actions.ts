export enum ConfigActions {
  RestoreStateFromLocal = 'Restore store from localStorage',

  // Get oneTimeToken
  GetFromOneTimeToken = '[Pending] Get From One-Time Token',
  GetFromOneTimeTokenSuccess = '[Success] Get From One-Time Token',
  GetFromOneTimeTokenError = '[Error] Get From One-Time Token',

  // // Get accessToken first time by oneTimeToken
  // GetFirstAccessToken = '[Pending] Get First Access Token',
  // GetFirstAccessTokenSuccess = '[Success] Get First Access Token',
  // GetFirstAccessTokenError = '[Error] Get First Access Token',

  // Get organization access token
  GetActiveOrganiztionAccessToken = '[Pending] Get Active Organiztion Access Token',
  GetActiveOrganiztionAccessTokenSuccess = '[Success] Get Active Organiztion Access Token',
  GetActiveOrganiztionAccessTokenError = '[Error] Get Active Organiztion Access Token',

  GetConfig = '[Pending] Get Config',
  GetConfigSuccess = '[Success] Get Config',
  GetConfigError = '[Error] Get Config',
}
