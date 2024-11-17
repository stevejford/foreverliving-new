/**
 * Supabase JWT template for Clerk
 * Template name: supabase
 */
{
  "custom_user_id": "{{user.id}}",
  "custom_role": "authenticated",
  "custom_claims": {
    "name": "{{user.first_name}} {{user.last_name}}",
    "email": "{{user.primary_email_address}}",
    "image": "{{user.image_url}}"
  }
}
