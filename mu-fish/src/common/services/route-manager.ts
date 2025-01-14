import { Manager } from '@lomray/react-route-manager';

/**
 * Application URL manager
 */
const manager = new Manager({
  routes: {
    home: {
      url: '/',
    },
    details: {
      url: '/details',
      children: {
        user: {
          url: '/user/:id',
          params: { id: '' },
        },
      },
    },
    errorBoundary: {
      url: '/error-boundary',
    },
    nestedSuspense: {
      url: '/nested-suspense',
    },
    redirect: {
      url: '/redirect-demo',
    },
    notLazy: {
      url: '/not-lazy',
    },
    fish: {
      url: '/mu-fish',
    },
  },
});

export default manager;
