import { createBrowserHistory, createHashHistory } from 'history';
import moment from 'moment';

export const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

const history = isStandalone ? createHashHistory() : createBrowserHistory();

export const attachLocationSaver = (
  expN = 10, 
  expU = 'm', 
  storageItem = 'lastLocation'
) => ( 
  history
) => {
history.listen((location, action) => {
  localStorage.setItem(
    storageItem,
    `${moment().add(expN, expU).toISOString()}-${location.pathname}`
  );
});
}

export const returnToPage = (storageItem = 'lastLocation')=>(history) => {
const locationString = localStorage.getItem(storageItem);

if (locationString) {
  const [ expiration, lastLocation ] = locationString.split('Z-');
  if (moment().isBefore(expiration + 'Z') && isStandalone) {
    history.push(lastLocation);
  } 
}
}

export default history;