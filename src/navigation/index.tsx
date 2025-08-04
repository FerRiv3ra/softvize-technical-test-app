import React from "react";

import AuthNavigator from "./auth/AuthNavigator";

export default function AppNavigation() {
  //   const token = AppStorage.getUserToken('refreshToken');
  //   const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);
  //   const user = useSelector(authSelectors.selectCurrentUser);
  //   const refreshStatus = useSelector(authSelectors.selectAuthRefreshStatus);

  //   const { initialise } = useAppInitialization();

  //   const verifyAuth = useMemo(() => {
  //     if (!token && !isAuthenticated) return false;
  //     if (!user) return false;
  //     if (refreshStatus === 'error') return false;

  //     return true;
  //   }, [token, isAuthenticated, user, refreshStatus]);

  //   useEffect(() => {
  //     initialise();
  //   }, []);

  //   if (verifyAuth) {
  //     if (user?.role === UserRoleEnum.TENANT) {
  //       Alert.alert(
  //         'Access Denied',
  //         'You do not have permission to access this application.',
  //       );
  //       // TODO: Handle tenant access
  //       return <AuthNavigator />;
  //     }

  //     return <TabNavigator />;
  //   }

  return <AuthNavigator />;
}
