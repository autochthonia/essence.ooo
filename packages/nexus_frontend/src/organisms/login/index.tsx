import React, { FunctionComponent, useEffect } from "react";
import useAuthContext from "../../services/auth";
import { useCurrentRoute } from "react-navi";
import discordLookup from "../../services/auth/discordLookup";

const LoginOrganism: FunctionComponent = () => {
  const { url } = useCurrentRoute();
  const { user, cookie, setUser } = useAuthContext();
  useEffect(() => {
    async function cookieAuth() {
      if (cookie) {
        console.log("Found cookie");
        const hydratedCookie = JSON.parse(cookie);
        const user = await discordLookup(
          hydratedCookie.token_type,
          hydratedCookie.access_token
        );
        if (user) {
          setUser(user);
        }
      }
    }
    cookieAuth();
  }, [cookie, setUser]);
  return (
    <div>
      <span>Login Status: {user ? "Logged In" : "Logged Out"}</span>
      {!user && (
        <a
          href={`https://discordapp.com/api/oauth2/authorize?redirect_uri=${
            window.location.origin
          }/oauth/redirect&response_type=token&client_id=656006759533641739&scope=${[
            "identify"
            // "guilds",
            // "guilds.join"
          ].join("%20")}&state=${btoa(JSON.stringify(url))}`}
        >
          Log In
        </a>
      )}
    </div>
  );
};

export default LoginOrganism;
