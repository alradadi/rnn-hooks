import debounce from 'lodash/debounce';
import { useContext, useEffect, useMemo } from 'react';
import { Navigation } from 'react-native-navigation';

import { NavContext } from './NavProvider';

const debounceValue = 500;

export const useNavButtonPressed = (callback: (buttonId: string) => void) => {
  const { componentId } = useContext(NavContext);

  const debouncedCallback = useMemo(
    () => debounce(callback, debounceValue, { leading: true, trailing: false }),
    [callback],
  );

  useEffect(() => {
    const listener = {
      navigationButtonPressed: ({ buttonId }: { buttonId: string }) =>
        debouncedCallback(buttonId),
    };
    const unsubscribe = Navigation.events().registerComponentListener(
      listener,
      componentId,
    );
    return () => {
      unsubscribe.remove();
    };
  }, [componentId, debouncedCallback]);
};
