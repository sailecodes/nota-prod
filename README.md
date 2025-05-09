<!--            -->
<!-- REFACTORED -->
<!--            -->

<!-- Auth -->

/actions/auth.ts
/reset-password/page.tsx
/reset-password/\_components/reset-password-form.tsx
/sign-in/page.tsx
/sign-in/\_components/sign-in-form.tsx
/sign-up/page.tsx
/sign-up/\_components/sign-up-form.tsx

<!-- Account -->

/actions/account.ts
/account/loading.tsx
/account/page.tsx
/account/\_components/danger-zone.tsx
/account/\_components/email-address.tsx
/account/\_components/password.tsx
/account/\_components/user-information.tsx

<!--      -->
<!-- TODO -->
<!--      -->

- Create `isResettingPassword` metadata in Supabase to prevent users NOT actively resetting their password from accessing `/reset-password` route
