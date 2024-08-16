import { absoluteUrl } from "@/lib/utils";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/thank-you(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (
    (req.url.includes("/sign-in") || req.url.includes("/sign-up")) &&
    !!auth().userId
  ) {
    return Response.redirect(absoluteUrl("/"));
  }
});

export const config = {
  matcher: [
    "/((?!.+.[w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/configure(.*)",
  ],
};
