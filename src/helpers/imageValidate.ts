import { faBullseye } from '@fortawesome/free-solid-svg-icons';

export const checkImage = async (urls: string[]) => {
  const asynFunc = (url: string) => {
    return new Promise((resolve, reject) => {
      let s: HTMLImageElement = document.createElement('img');
      s.src = url;

      s.onerror = function () {
        reject(false);
      };
      s.onload = function () {
        resolve(true);
      };
    });
  };

  let promises: any[] = [];

  urls.forEach((url) => {
    if (url) {
      promises.push(asynFunc(url));
    }
  });

  const result = await Promise.allSettled(promises);
  const states = result.map((promise) => promise.status);
  if (states.some((state) => state === 'rejected')) {
    return false;
  } else {
    return true;
  }
};
