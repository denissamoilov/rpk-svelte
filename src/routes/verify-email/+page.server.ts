import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, fetch }) => {
  const token = url.searchParams.get("token");

  if (!token) {
    throw error(400, {
      message: "Verification token is missing",
    });
  }

  try {
    const response = await fetch(
      `http://localhost:5005/api/verify-email/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw error(400, {
        message: data.error || "Verification failed",
      });
    }

    // Redirect to login with success message
    throw redirect(303, "/login?message=email-verified");
  } catch (err) {
    if (err instanceof Response) throw err; // Rethrow redirect or error responses

    console.error("Verification error:", err);
    throw error(500, {
      message: "Failed to verify email. Please try again later.",
    });
  }
};
