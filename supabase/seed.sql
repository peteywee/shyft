-- Seed Admin and Users
insert into users (email, name, role)
values
  ('admin@example.com', 'Alice Admin', 'admin'),
  ('bob@example.com', 'Bob Staff', 'user'),
  ('carol@example.com', 'Carol Staff', 'user');

-- Seed Shifts
insert into shifts (shift_name, start_time, end_time)
values
  ('Morning Shift', '2025-08-05T08:00:00+00', '2025-08-05T16:00:00+00'),
  ('Evening Shift', '2025-08-05T16:00:00+00', '2025-08-06T00:00:00+00');

-- Map users to shifts
insert into user_shifts (user_id, shift_id)
select u.id, s.id
from users u, shifts s
where u.email = 'bob@example.com' and s.shift_name = 'Morning Shift';

-- Seed pay history
insert into pay_history (user_id, pay_date, amount)
select id, current_date, 200.00 from users where email = 'bob@example.com';

insert into pay_history (user_id, pay_date, amount)
select id, current_date, 210.00 from users where email = 'carol@example.com';

