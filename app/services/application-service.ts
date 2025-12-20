import { baseApi } from "@/core/api/base-api";
import { useApplicationStore } from "@/stores/userApplicationStore";

interface ApplyResponse {
  data: {
    application: any;
    cv_url: string;
  };
  message: string;
}

/**
 * Apply to an internship using existing CV
 */
export const applyToInternship = async (internshipId: number): Promise<ApplyResponse> => {
  try {
    const response = await baseApi<ApplyResponse>(
      `internships/${internshipId}/apply`,
      {
        method: "POST",
        body: {
          use_existing_cv: true,
        },
      }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Check if user has CV uploaded
 */
export const checkUserHasCV = async (): Promise<{ has_cv: boolean; cv_url: string | null }> => {
  try {
    const response = await baseApi<{
      data: {
        cv_url: string | null;
      };
    }>("user/profile/details");

    return {
      has_cv: !!response.data.cv_url,
      cv_url: response.data.cv_url,
    };
  } catch (error) {
    console.error("Failed to check CV status:", error);
    return { has_cv: false, cv_url: null };
  }
};

/**
 * Check if user has already applied to an internship
 */
export const checkAlreadyApplied = async (internshipId: number): Promise<boolean> => {
  try {
    const applicationStore = useApplicationStore();

    if (applicationStore.applications.length === 0) {
      await applicationStore.fetchApplications();
    }

    return applicationStore.applications.some(
      (app) => app.internshipId === internshipId
    );
  } catch (error) {
    console.error("Failed to check application status:", error);
    return false;
  }
};
