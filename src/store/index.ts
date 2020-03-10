import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getTransports$ } from './Transport/transports.effect';
import transports, { TransportsState } from './Transport/transports.reducer';
import history, { HistoryState } from './History/history.reducer';
import zones, { ZonesState } from './Zones/zones.reducer';
import parkings, { ParkingsState } from './Parkings/parkings.reducer';
import grants, { GrantsState } from './Grants/grants.reducer';
import balance, { BalanceState } from './Balance/balance.reducer';
import abonements, { AbonementState } from './Abonements/abonements.reducer';
import receipts, { ReceiptsState } from './Receipts/receipts.reducer';
import config, { ConfigState } from './Config/config.reducer';
import legalEntities, { LegalEntitiesState } from './LegalEntities/legalEntities.reducer';
import organizationWrapper, { OrganizationWrapperState } from './OrganizationWrapper/organizationWrapper.reducer';
import notification, { OpenNotificationState } from './Notification/notification.reducer';
import { getHistory$, downloadHistory$ } from './History/history.effect';
import { getZones$ } from './Zones/zones.effect';
import { getParkings$, createParking$, stopParking$, checkCostParking$ } from './Parkings/parkings.effect';
import { getGrants$ } from './Grants/grants.effect';
import { getBalance$ } from './Balance/balance.effect';
import { getAbonements$ } from './Abonements/abonements.effect';
import { getLegalEntities$, updateLegalEntities$ } from './LegalEntities/legalEntities.effect';
import { getReceipts$, createReceipts$, downloadReceipts$, sendInvoiceReceipts$ } from './Receipts/receipts.effect';
import { getConfig$ } from './Config/config.effect';
import { getFromOneTimeToken$, getActiveOrganizationAccessToken$ } from './Config/config.effect';
import orgProfile, { OrgProfileState } from './OrgProfile/OrgProfile.reducer';
import { getOrgProfile$ } from './OrgProfile/OrgProfile.effect';
import { createCheck$ } from './OrganizationWrapper/organizationWrapper.effect';
import { pushNotification$, shiftNotification$ } from './Notification/notification.effect';

export interface Store {
  config: ConfigState;
  balance: BalanceState;
  transports: TransportsState;
  orgProfile: OrgProfileState;
  history: HistoryState;
  zones: ZonesState;
  parkings: ParkingsState;
  grants: GrantsState;
  legalEntities: LegalEntitiesState;
  abonements: AbonementState;
  receipts: ReceiptsState;
  organizationWrapper: OrganizationWrapperState;
  notification: OpenNotificationState;
}

const observableMiddleware = createEpicMiddleware();

const reducers = combineReducers({
  config,
  balance,
  transports,
  orgProfile,
  history,
  legalEntities,
  zones,
  parkings,
  grants,
  abonements,
  receipts,
  organizationWrapper,
  notification,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(observableMiddleware)));

observableMiddleware.run(
  combineEpics<any>(
    getFromOneTimeToken$,
    getActiveOrganizationAccessToken$,
    getOrgProfile$,
    getTransports$,
    getHistory$,
    downloadHistory$,
    getParkings$,
    getBalance$,
    getGrants$,
    getZones$,
    createParking$,
    stopParking$,
    checkCostParking$,
    getAbonements$,
    getLegalEntities$,
    getReceipts$,
    createReceipts$,
    downloadReceipts$,
    sendInvoiceReceipts$,
    getConfig$,
    createCheck$,
    updateLegalEntities$,
    pushNotification$,
    shiftNotification$,
  ),
);
