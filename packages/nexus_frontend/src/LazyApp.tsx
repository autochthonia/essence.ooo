import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";
import { mount, route } from "navi";
import React, { FunctionComponent, lazy, Suspense } from "react";
import { Router, View } from "react-navi";
import { AuthContextProvider } from "./services/auth";

Sentry.init({
  dsn: "https://9656fc1c24a84d66a89f079981d684b7@sentry.io/1860567",
  release: process.env.AWS_COMMIT_ID,
  environment: process.env.NODE_ENV,
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error"],
    }),
  ],
});

Sentry.setTags({
  origin: window.location.origin,
  app: "web",
});

const LazyOauthRedirectPage = lazy(() => import("./pages/oauth/redirect"));
const LazyListingCreatePage = lazy(() => import("./pages/listing/create"));

const routes = mount({
  "/": route({
    title: "Create Listing",
    getView: () => <LazyListingCreatePage />,
  }),
  "/oauth/redirect": route({
    title: "Discord OAuth Redirect",
    getView: () => <LazyOauthRedirectPage />,
  }),
});

const LazyApp: FunctionComponent = () => {
  return (
    <AuthContextProvider>
      <Router routes={routes}>
        <Suspense fallback="loading">
          <View />
        </Suspense>
      </Router>
    </AuthContextProvider>
  );
};

export default LazyApp;
