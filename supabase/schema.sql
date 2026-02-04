-- Mini-ATS schema + RLS policies
-- Apply in Supabase SQL editor.

create extension if not exists "pgcrypto";

-- Enums
create type public.user_role as enum ('admin', 'customer');
create type public.application_status as enum ('New', 'Screening', 'Interview', 'Offered', 'Rejected');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role public.user_role not null default 'customer'
);

-- Jobs
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  description text,
  customer_id uuid not null references public.profiles (id) on delete cascade
);

-- Candidates
create table public.candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  linkedin_url text,
  current_role text
);

-- Applications
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  candidate_id uuid not null references public.candidates (id) on delete cascade,
  status public.application_status not null default 'New'
);

create index on public.jobs (customer_id);
create index on public.applications (job_id);
create index on public.applications (candidate_id);

-- RLS helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- Profiles RLS
alter table public.profiles enable row level security;

create policy "profiles_admin_all"
  on public.profiles
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "profiles_self_select"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles_self_update"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_self_insert"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Jobs RLS
alter table public.jobs enable row level security;

create policy "jobs_admin_all"
  on public.jobs
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "jobs_customer_own"
  on public.jobs
  for all
  using (customer_id = auth.uid())
  with check (customer_id = auth.uid());

-- Candidates RLS (admins only)
alter table public.candidates enable row level security;

create policy "candidates_admin_all"
  on public.candidates
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Applications RLS
alter table public.applications enable row level security;

create policy "applications_admin_all"
  on public.applications
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "applications_customer_own_jobs"
  on public.applications
  for all
  using (
    exists (
      select 1
      from public.jobs j
      where j.id = applications.job_id
        and j.customer_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.jobs j
      where j.id = applications.job_id
        and j.customer_id = auth.uid()
    )
  );

-- Optional: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
