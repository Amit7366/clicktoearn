import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];

const commonPrivateRoutes = [
  '/dashboard',
  '/dashboard/change-password',
  '/doctors',
];

const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Correct way to read cookies in middleware
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow access to common private routes
  if (
    commonPrivateRoutes.includes(pathname) ||
    commonPrivateRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  let decodedData: any = null;

  try {
    decodedData = jwtDecode(accessToken);
  } catch (e) {
    // Invalid token — redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = decodedData?.role;

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const roleRoutes = roleBasedPrivateRoutes[role as Role];
    if (roleRoutes.some((regex) => regex.test(pathname))) {
      return NextResponse.next();
    }
  }

  // ❌ If none of the allowed paths matched — redirect
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*', '/doctors/:path*'],
};
