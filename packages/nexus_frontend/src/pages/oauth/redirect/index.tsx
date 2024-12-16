import { FunctionComponent, useEffect, useMemo } from "react";
import useAuthContext from "../../../services/auth";
import { useCurrentRoute, useNavigation } from "react-navi";
import getHashParams from "../../../util/getHashParams";
import Cookies from "js-cookie";
import addSeconds from "date-fns/addSeconds";
import discordLookup from "../../../services/auth/discordLookup";

const OauthRedirectPage: FunctionComponent = () => {
  const {
    url: { hash },
  } = useCurrentRoute();
  const navigation = useNavigation();
  const { setUser } = useAuthContext();
  const hashParams = useMemo(() => {
    const hashParams = getHashParams(hash);
    const expiry = addSeconds(new Date(), Number(hashParams.expires_in));
    Cookies.set(
      "discord_token",
      { ...hashParams, expiry },
      {
        expires: expiry,
      }
    );
    return hashParams;
  }, [hash]);
  useEffect(() => {
    async function redirectAuth() {
      const user = await discordLookup(
        hashParams.token_type,
        hashParams.access_token
      );
      if (user) {
        try {
          setUser(user);
          navigation.navigate(
            hashParams.state ? JSON.parse(atob(hashParams.state)) : "/"
          );
          return true;
        } catch (ex) {
          console.error(ex);
        }
      }
      Cookies.remove("discord_token");
      navigation.navigate("/");
      return false;
    }
    redirectAuth();
  }, [hashParams, navigation, setUser]);

  return null;
};

export default OauthRedirectPage;
