export async function signup(formData: FormData) {
  const supabase = createClient();

  /*
   * type-casting here for convenience
   * in practice, you should validate your inputs
   */
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
