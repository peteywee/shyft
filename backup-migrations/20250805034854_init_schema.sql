-- Enable UUID support
create extension if not exists "pgcrypto";

-- USERS
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  name text not null,
  photo_url text,
  role text check (role in ('user', 'admin')) not null,
  created_at timestamptz default now()
);

-- SHIFTS
create table shifts (
  id uuid primary key default gen_random_uuid(),
  shift_name text not null,
  start_time timestamptz not null,
  end_time timestamptz not null
);

-- USER_SHIFTS
create table user_shifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  shift_id uuid references shifts(id) on delete cascade,
  assigned_at timestamptz default now()
);

-- PAY HISTORY
create table pay_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  pay_date date not null,
  amount numeric(10,2) not null
);
