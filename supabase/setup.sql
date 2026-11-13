begin;

create table if not exists public.hotza_event_visitors (
  id uuid primary key,
  seen_at timestamptz not null,
  claimed_at timestamptz
);
create index if not exists hotza_event_seen_idx on public.hotza_event_visitors (seen_at);
create index if not exists hotza_event_claimed_idx on public.hotza_event_visitors (id) where claimed_at is not null;
alter table public.hotza_event_visitors enable row level security;
revoke all on public.hotza_event_visitors from public, anon, authenticated;
grant select, insert, update on public.hotza_event_visitors to service_role;

create or replace function public.hotza_event_record(visitor_id uuid, claim_code boolean)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  observed_at timestamptz := clock_timestamp();
begin
  insert into public.hotza_event_visitors as visitor (id, seen_at, claimed_at)
  values (visitor_id, observed_at, case when claim_code then observed_at end)
  on conflict (id) do update set
    seen_at = greatest(visitor.seen_at, excluded.seen_at),
    claimed_at = coalesce(visitor.claimed_at, excluded.claimed_at);

  return jsonb_build_object(
    'total', (select count(*) from public.hotza_event_visitors),
    'online', (select count(*) from public.hotza_event_visitors where seen_at >= observed_at - interval '45 seconds'),
    'claimed', (select count(*) from public.hotza_event_visitors where claimed_at is not null)
  );
end;
$$;

revoke all on function public.hotza_event_record(uuid, boolean) from public, anon, authenticated;
grant execute on function public.hotza_event_record(uuid, boolean) to service_role;

commit;

