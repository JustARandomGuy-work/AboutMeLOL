import { supabase } from "./supabase";

export async function signInWithDiscord() {
  return supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
}

export async function signInWithEmail(email: string, password?: string) {
  if (password) {
    return supabase.auth.signInWithPassword({ email, password });
  } else {
    // Magic link / OTP
    return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` }});
  }
}

export async function signUpWithEmail(email: string, password?: string, username?: string) {
  if (password) {
    return supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username
        },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
  } else {
    return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` }});
  }
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/dashboard/settings`,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}
