import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // Import the type for event

export async function handleLogin(
  data: FormData,
  locals: RequestEvent['locals']
) {

  const email = data.get('email')?.toString();
  const password = data.get('password')?.toString();
  const isLogin = data.get('isLogin') === 'true';

  if (!email || !password) {
    throw error(400, 'Email and password are required.');
  }

  try {
    if (isLogin) {
      const { error: authError } = await locals.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        throw error(400, authError.message);
      }
    } else {
      const { error: authError } = await locals.supabase.auth.signUp({
        email,
        password,
      });


      if (authError) {
        throw error(400, authError.message);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Error in handleLogin:', err);
    if (err instanceof Error) {
      throw error(500, err.message);
    }
    throw error(500, 'Internal Server Error.');
  }
}
