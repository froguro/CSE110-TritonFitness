declare module '@react-oauth/google' {
  export interface GoogleLoginProps {
    onSuccess: (response: any) => void;
    onError: () => void;
  }

  export const GoogleLogin: React.FC<GoogleLoginProps>;
  export const GoogleOAuthProvider: React.FC<{ clientId: string; children: React.ReactNode }>;
}

declare module 'jwt-decode' {
  export function jwtDecode(token: string): any;
} 