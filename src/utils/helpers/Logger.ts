// import * as Sentry from '@sentry/react-native';
// import crashlytics from '@react-native-firebase/crashlytics';

// @ts-ignore
export const logAppEvent = (event: string, data?: any) => {
  try {
    console.log(event, data);
    // if (__DEV__) {
    //   console.log(event, data);
    // } else {
    //   Sentry.captureException(event, {
    //     level: 'info',
    //     extra: data,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

// @ts-ignore
export const logAppError = (message: string, error?: any) => {
  try {
    console.log('logAppError', error, message);
    // if (__DEV__) {
    //   console.log('logAppError', error, message);
    // } else {
    //   crashlytics().log(message ?? 'error');
    //   crashlytics().recordError(error, message);
    //   Sentry.captureException(error, {
    //     level: 'error',
    //     extra: {
    //       message,
    //     },
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const initUserLogs = (userId?: string) => {
  try {
    if (userId) {
      if (__DEV__) {
        console.log('initUserLogs', userId);
        return;
      }

      // Sentry.setUser({
      //   id: userId,
      // });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserLogs = () => {
  // Sentry.setUser(null);
};
