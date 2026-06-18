'use server';

import { serverMutation } from "../core/server";

export const submitJobApplication = async (applicationData) => {
    return serverMutation('/api/applications', applicationData);
}