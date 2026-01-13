import { useEffect, useState } from "react";
import { defaultProfile, validateProfile, type Profile} from "../../lib/schema";
import { loadProfile, saveProfile } from "../../lib/storage";

export function OptionsApp() {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const[status, setStatus] = useState<string>("");

    useEffect(() =>{
        loadProfile().then((p) => p && setProfile(p));
    }, []);
}