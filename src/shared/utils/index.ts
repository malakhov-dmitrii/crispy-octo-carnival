import { AuthConfig } from '../../store/Config/config.reducer';

export const smartRound = (num: number, fractionalLength = 2) => {
  if (num === null) {
    return;
  }

  return parseFloat(num.toFixed(fractionalLength));
};

export const timeFormat = (() => {
  const num = (val: number) => {
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
  };

  return (ms: number) => {
    const sec = ms / 1000;
    const hours = (sec / 3600) % 24;
    const minutes = (sec / 60) % 60;

    return num(hours) + ':' + num(minutes);
  };
})();

export const useLocalAuth = () => {
  const localAuth: AuthConfig = JSON.parse(localStorage.getItem('auth') || 'null');

  if (localAuth && localAuth.employeeId && localAuth.refreshToken && localAuth.accessToken) return localAuth;
  else return null;
};

export const mimeTypes = [
  'application/vnd.rar',
  'application/zip',
  'application/msword',
  'application/pdf',
  'image/jpeg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
