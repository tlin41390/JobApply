import type { Profile } from "./schema";


const KEY = "profile";

let cachedBrowser: any = null;

// const browserAPI = typeof browser !== "undefined" ? browser : (window as any).browser;

async function getBrowser() {
    //wait for browser to be available

    if (cachedBrowser) return cachedBrowser;
    let attempts = 0;
    while (typeof (window as any).browser === 'undefined' && attempts < 10){
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    return (window as any).browser;
}


export async function loadProfile(): Promise<Profile | null> {
    try {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load profile:', e);
        return null;
    }
}

export async function saveProfile(profile: Profile): Promise<void> {
    try{
        const browserAPI = await getBrowser();
        if(!browserAPI) throw new Error('Browser API not available');
        await browserAPI.storage.local.set({ [KEY]: profile});
    } catch (e) {
        console.error('Failed to save profile:', e);
    }
}