import { ElementType, useContext, useEffect, useMemo, useRef } from 'react';
import { Navigation, Options } from 'react-native-navigation';

import { NavContext } from './NavProvider';

type NavComp<P = Dict> = ElementType<P> & {
  navId: string;
  options?: () => Options;
};

export const useNav = () => {
  const { componentId } = useContext(NavContext);

  const componentIdRef = useRef(componentId);

  useEffect(() => {
    componentIdRef.current = componentId;
  }, [componentId]);

  return useMemo(
    () => ({
      dismissAllModals: () => Navigation.dismissAllModals(),

      dismissModal: () => Navigation.dismissModal(componentIdRef.current),

      dismissOverlay: () => Navigation.dismissOverlay(componentIdRef.current),

      mergeOptions: (options: Options) =>
        Navigation.mergeOptions(componentIdRef.current, options),

      pop: () => Navigation.pop(componentIdRef.current),

      popToRoot: () => Navigation.popToRoot(componentIdRef.current),

      push: <P extends Dict>(
        CompClass: NavComp<P>,
        passProps: P,
        options?: Options,
      ) =>
        Navigation.push(componentIdRef.current, {
          component: {
            name: CompClass.navId,
            options,
            passProps,
          },
        }),

      showModal: <P extends Dict>(
        CompClass: NavComp<P>,
        passProps: P,
        options?: Options,
      ) =>
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  name: CompClass.navId,
                  options,
                  passProps,
                },
              },
            ],
          },
        }),

      showOverlay: <P extends Dict>(
        CompClass: NavComp<P>,
        passProps: P,
        options?: Options,
      ) =>
        Navigation.showOverlay({
          component: {
            name: CompClass.navId,
            options,
            passProps,
          },
        }),
    }),

    [],
  );
};
