-- Migration: Create auth tables for NextAuth integration (prefixed with auth_ to avoid collisions)

-- accounts table
CREATE TABLE IF NOT EXISTS auth_accounts (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  provider_account_id text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at integer,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  PRIMARY KEY (provider, provider_account_id)
);
CREATE INDEX IF NOT EXISTS auth_accounts_user_idx ON auth_accounts(user_id);

-- sessions table for auth
CREATE TABLE IF NOT EXISTS auth_sessions (
  session_token text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires timestamp NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_sessions_user_idx ON auth_sessions(user_id);

-- verification tokens (composite primary key: identifier + token)
CREATE TABLE IF NOT EXISTS auth_verification_tokens (
  identifier text NOT NULL,
  token text NOT NULL,
  expires timestamp NOT NULL,
  PRIMARY KEY (identifier, token)
);
CREATE INDEX IF NOT EXISTS auth_verification_tokens_token_idx ON auth_verification_tokens(token);
CREATE INDEX IF NOT EXISTS auth_verification_tokens_identifier_idx ON auth_verification_tokens(identifier);
