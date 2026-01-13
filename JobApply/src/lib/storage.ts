import type { Profile } from "./schema";


const KEY = "profile";

export async function loadProfile(): Promise<Profile | null> {
    const res = await browser.storage.local.get(KEY);
        return(res[KEY] as Profile) ?? null;
}

export async function saveProfile(profile: Profile): Promise<void> {
    await browser.storage.local.set({ [KEY]: profile});
}