import React, { FunctionComponent } from "react";
import useAuthContext from "../../services/auth";

const LoginOrganism: FunctionComponent = () => {
  const { user, setUser } = useAuthContext();
  return (
    <div>
      <span>Login Status {user ? "Logged In" : "Logged Out"}</span>
      {!user && (
        <a
          href={`https://discordapp.com/api/oauth2/authorize?response_type=token&client_id=656006759533641739&scope=identify%20guilds%20guilds.join&state=${btoa(
            JSON.stringify("secret")
          )}`}
        >
          Log In
        </a>
      )}
    </div>
  );
};

export default LoginOrganism;
