/* global window, localStorage */
// import { createBrowserHistory, createHashHistory } from 'history';
import { createHashHistory } from 'history';
import moment from 'moment';

export const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

// const history = isStandalone ? createHashHistory() : createBrowserHistory();
const history = createHashHistory();

export const attachLocationSaver = (
  expN = 10,
  expU = 'm',
  storageItem = 'lastLocation',
) => (historyObject) => {
  historyObject.listen((location) => {
    localStorage.setItem(
      storageItem,
      `${moment().add(expN, expU).toISOString()}-${location.pathname}`,
    );
  });
};

export const returnToPage = (storageItem = 'lastLocation') => (historyObject) => {
  const locationString = localStorage.getItem(storageItem);

  if (locationString) {
    const [expiration, lastLocation] = locationString.split('Z-');
    if (moment().isBefore(`${expiration}Z`) && isStandalone) {
      historyObject.push(lastLocation);
    }
  }
};

export default history;
