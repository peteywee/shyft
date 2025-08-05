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

-- Enable Row-Level Security
alter table users enable row level security;
alter table shifts enable row level security;
alter table user_shifts enable row level security;
alter table pay_history enable row level security;

-- USERS RLS Policies
create policy "Users can view own profile"
on users for select
using (auth.uid() = id);

create policy "Users can update own profile"
on users for update
using (auth.uid() = id);

create policy "Admins manage all users"
on users for all
using (exists (
  select 1 from users u where u.id = auth.uid() and u.role = 'admin'
));

-- SHIFTS RLS Policies
create policy "Users can view shifts"
on shifts for select
using (auth.role() = 'authenticated');

create policy "Admins manage all shifts"
on shifts for all
using (exists (
  select 1 from users u where u.id = auth.uid() and u.role = 'admin'
));

-- USER_SHIFTS RLS Policies
create policy "Users view their shifts"
on user_shifts for select
using (auth.uid() = user_id);

create policy "Admins manage all user shifts"
on user_shifts for all
using (exists (
  select 1 from users u where u.id = auth.uid() and u.role = 'admin'
));

-- PAY HISTORY RLS Policies
create policy "Users view their own pay"
on pay_history for select
using (auth.uid() = user_id);

create policy "Admins manage pay"
on pay_history for all
using (exists (
  select 1 from users u where u.id = auth.uid() and u.role = 'admin'
));
