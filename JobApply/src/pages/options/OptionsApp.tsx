import { useEffect, useState } from "react";
import { defaultProfile, validateProfile, type Profile } from "../../lib/schema";
export function OptionsApp() {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const [status, setStatus] = useState<string>("");

    const errs = validateProfile(profile);



    async function onSave() {
        if (errs.length) {
            setStatus("Please Fix: " + errs.join(", "));
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/save-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profile }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus(data.message || "Profile successfully saved");
            } else {
                setStatus("Error: " + data.error);
            }
        } catch(error){
            setStatus("Failed to connect to server");
            console.error(error);
        }
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