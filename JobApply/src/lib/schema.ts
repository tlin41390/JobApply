export type Profile = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    links: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
};

export const defaultProfile: Profile = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    links: {}
};

export function validateProfile(profile: Profile): string[] {
    const errs: string[] = [];
    if(!profile.firstName) errs.push("First name required");
    if(!profile.lastName) errs.push("Last name required");
    if(!profile.email.includes("@")) errs.push("Validate email required");
    return errs;
}