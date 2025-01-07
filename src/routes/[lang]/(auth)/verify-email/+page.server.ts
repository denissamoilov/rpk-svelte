import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { api } from "$lib/api";
import { config } from "$lib/config";

interface VerificationResponse {
  success: boolean;
  message: string;
  user: {
    email: string;
    isVerified: boolean;
  };
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const token = url.searchParams.get("token");

  console.log(JSON.stringify({ token }));

  if (!token) {
    throw error(400, {
      message: "Verification token is missing",
    });
  }

  try {
    const response = await api(config.endpoints.auth.verifyEmail, {
      requireAuth: false,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data: VerificationResponse = await response.json();

    // if (!response.ok) {
    //   return {
    //     success: data.success,
    //     message: data.message,
    //     user: data.user,
    //   };
    // }

    return {
      success: data.success,
      message: data.message,
      user: data.user,
    };
  } catch (err) {
    console.error("Verification error:", err);
    return {
      success: false,
      message: "Failed to verify email. Please try again later.",
      user: null,
    };
  }
};
