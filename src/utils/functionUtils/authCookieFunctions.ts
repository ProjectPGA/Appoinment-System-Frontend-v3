import { CookieNames } from '@/models/cookies/CookieNames';
import { useAuthStore } from '@/stores/auth';
import { useCookies } from '@vueuse/integrations/useCookies';

/**
 * Sets up a listener for changes in authentication cookies and
 * logs out the user if the authentication cookie is removed.
 *
 * @returns An object with a method `checkAuthentication` that checks if the `AUTHENTICATED` cookie is
 * not present and logs out the user if it is not found.
 */
export const setupAuthCookieListener = () => {
  const cookies = useCookies();
  const authStore = useAuthStore();

  cookies.addChangeListener(changedCookie => {
    if (
      changedCookie.name === CookieNames.AUTHENTICATED &&
      !changedCookie.value
    ) {
      authStore.logout();
    }
  });

  return {
    checkAuthentication: () => {
      if (!cookies.get(CookieNames.AUTHENTICATED)) {
        authStore.logout();
      }
    },
  };
};
