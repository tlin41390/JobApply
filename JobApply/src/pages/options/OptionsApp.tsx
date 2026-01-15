import { useEffect, useState } from "react";
import { defaultProfile, validateProfile, type Profile } from "../../lib/schema";
import { loadProfile, saveProfile } from "../../lib/storage";

export function OptionsApp() {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        loadProfile().then((p) => p && setProfile(p));
    }, []);

    const errs = validateProfile(profile);

    async function onSave() {
        if (errs.length) {
            setStatus("Please Fix: " + errs.join(", "));
            return;
        }
        await saveProfile(profile);
        setStatus("Profile successfully saved");
        console.log(profile);
    }

    return (
        <div style={{ maxWidth: 800, margin: "24px auto", fontFamily: "system-ui " }}>
            <h1>JobAppy Profile</h1>
            <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <label>
                    First name
                    <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
                </label>

                <label>
                    Last name
                    <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
                </label>

                <label>
                    Email
                    <input
                        type="text"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
                </label>
                <label>
                    Phone
                    <input type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }} />
                </label>
            </section>
            <section style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <h3>Links</h3>

                <label>
                    LinkedIn
                    <input
                        type="text"
                        value={profile.links.linkedin ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, links: { ...profile.links, linkedin: e.target.value } })
                        }
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
                    />
                </label>

                <label>
                    GitHub
                    <input
                        value={profile.links.github ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, links: { ...profile.links, github: e.target.value } })
                        }
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
                    />
                </label>

                <label>
                    Portfolio
                    <input
                        value={profile.links.portfolio ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, links: { ...profile.links, portfolio: e.target.value } })
                        }
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
                    />
                </label>
            </section>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={onSave} disabled={errs.length > 0}>
                    Save
                </button>
                <span>{status}</span>
                {errs.length > 0 && (
                    <span style={{ color: "crimson" }}>Missing: {errs.join(", ")}</span>
                )}
            </div>
        </div>
    )
}