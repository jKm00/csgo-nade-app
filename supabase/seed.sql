-- in roles into database
insert into
public.roles (name)
values
('USER'),
('MODERATOR'),
('ADMIN');

-- insert maps into db
insert into
public.maps (name, thumbnail, radar)
values
('Ancient', '/assets/images/thumbnails/ancient_compressed.webp', '/assets/images/radars/de_ancient.webp'),
('Anubis', '/assets/images/thumbnails/anubis_compressed.webp', '/assets/images/radars/de_anubis.webp'),
('Inferno', '/assets/images/thumbnails/inferno_compressed.webp', '/assets/images/radars/de_inferno.webp'),
('Mirage', '/assets/images/thumbnails/mirage_compressed.webp', '/assets/images/radars/de_mirage.webp'),
('Nuke', '/assets/images/thumbnails/nuke_compressed.webp', '/assets/images/radars/de_nuke.webp'),
('Overpass', '/assets/images/thumbnails/overpass_compressed.webp', '/assets/images/radars/de_overpass.webp'),
('Vertigo', '/assets/images/thumbnails/vertigo_compressed.webp', '/assets/images/radars/de_vertigo.webp');

-- insert profile pictures into db
-- Note: profile picture 1 is inserted in migration as this is the default profile picture when signing up
insert into
public.profile_pictures (filename)
values
('profile_2.png'),
('profile_3.png'),
('profile_4.png'),
('profile_5.png'),
('profile_6.png'),
('profile_7.png'),
('profile_8.png'),
('profile_9.png'),
('profile_10.png'),
('profile_11.png'),
('profile_12.png'),
('profile_13.png'),
('profile_14.png'),
('profile_15.png'),
('profile_16.png'),
('profile_17.png'),
('profile_18.png'),
('profile_19.png'),
('profile_20.png');

-- Insert positions
-- Ancient
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 1),
('B site', 'b_site.webp', 1),
('Banan', 'banan.webp', 1),
('Mid', 'mid.webp', 1);

-- Anubis
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 2),
('B site', 'b_site.webp', 2),
('Mid', 'mid.webp', 2),
('Water', 'water.webp', 2);

-- Inferno
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 3),
('B site', 'b_site.webp', 3),
('Banan', 'banan.webp', 3),
('Top mid', 'top_mid.webp', 3),
('Apps', 'apps.webp', 3);

-- Mirage
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 4),
('B site', 'b_site.webp', 4),
('Mid', 'mid.webp', 4),
('Palace', 'palace.webp', 4),
('B apps', 'b_apps.webp', 4),
('Short', 'short.webp', 4);

-- Nuke
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 5),
('B site', 'b_site.webp', 5),
('Outside', 'outside.webp', 5),
('Lobby', 'lobby.webp', 5),
('Ramp', 'ramp.webp', 5);

-- Overpass
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 6),
('B site', 'b_site.webp', 6),
('Long', 'long.webp', 6),
('Banan', 'banan.webp', 6),
('Fountain', 'fountain.webp', 6),
('Connector', 'connector.webp', 6),
('Monster entrance', 'monster_entrance.webp', 6),
('Sewage', 'sewage.webp', 6);

-- Vertigo
insert into
public.positions (name, img, map_id)
values
('A site', 'a_site.webp', 7),
('B site', 'b_site.webp', 7),
('A ramp', 'a_ramp.webp', 7),
('B ramp', 'b_ramp.webp', 7),
('Mid', 'mid.webp', 7);

-- test users
INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd2f1aaf1-67db-4271-a47d-55dc30863eab', '{"action":"user_confirmation_requested","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-10-13 14:37:15.708796+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6c92494-16d0-44be-bcf4-c7685399f13e', '{"action":"user_signedup","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-10-13 14:38:40.413891+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c7603f6-4321-45ba-8925-39dfe09fe91d', '{"action":"logout","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-10-13 14:38:54.327284+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e5d6d9a-af03-44f6-b041-da9fdd4a9c92', '{"action":"user_confirmation_requested","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-10-13 14:39:30.024136+00', ''),
	('00000000-0000-0000-0000-000000000000', '022ef666-8f41-4723-b0f9-d0c9029e29b5', '{"action":"user_signedup","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-10-13 14:39:49.435795+00', ''),
	('00000000-0000-0000-0000-000000000000', '239ccfb5-e386-49c3-b255-f885299ad578', '{"action":"logout","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-10-13 14:40:06.256257+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cfab597-099a-42d6-a144-20d9510655ad', '{"action":"login","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-10-13 14:40:48.121408+00', '');

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '2f67d176-15ec-4622-afa3-eeb0a56c10c9', 'authenticated', 'authenticated', 'test2@gmail.com', '$2a$10$NhQxQgWy6elqTF6Vly58eulQDfr5Iolgoj1X5LE1ccIZ88KDkuehm', '2023-10-13 14:39:49.437614+00', NULL, '', '2023-10-13 14:39:30.024976+00', '', NULL, '', '', NULL, '2023-10-13 14:39:49.439177+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-13 14:39:30.019441+00', '2023-10-13 14:39:49.445078+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '1196d029-6157-49de-8c01-9a1e0ceed845', 'authenticated', 'authenticated', 'test1@gmail.com', '$2a$10$3g0p91IinOXcROJMYywNCuxFuHDIRmnPS33H8dcK/.9FJW3v3jC7G', '2023-10-13 14:38:40.415953+00', NULL, '', '2023-10-13 14:37:15.713622+00', '', NULL, '', '', NULL, '2023-10-13 14:40:48.122376+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-13 14:37:15.683265+00', '2023-10-13 14:40:48.127627+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES
	('1196d029-6157-49de-8c01-9a1e0ceed845', '1196d029-6157-49de-8c01-9a1e0ceed845', '{"sub": "1196d029-6157-49de-8c01-9a1e0ceed845", "email": "test1@gmail.com"}', 'email', '2023-10-13 14:37:15.705158+00', '2023-10-13 14:37:15.705205+00', '2023-10-13 14:37:15.705205+00'),
	('2f67d176-15ec-4622-afa3-eeb0a56c10c9', '2f67d176-15ec-4622-afa3-eeb0a56c10c9', '{"sub": "2f67d176-15ec-4622-afa3-eeb0a56c10c9", "email": "test2@gmail.com"}', 'email', '2023-10-13 14:39:30.022766+00', '2023-10-13 14:39:30.022803+00', '2023-10-13 14:39:30.022803+00');

INSERT INTO "public"."profiles" ("uuid", "name", "username", "email", "inserted_at", "updated_at", "profile_picture") VALUES
	('1196d029-6157-49de-8c01-9a1e0ceed845', 'Test User 1', 'test_user1', 'test1@gmail.com', '2023-10-13 14:37:15.800209+00', '2023-10-13 14:37:15.800209+00', 20),
	('2f67d176-15ec-4622-afa3-eeb0a56c10c9', 'Test User 2', 'test_user2', 'test2@gmail.com', '2023-10-13 14:39:30.039147+00', '2023-10-13 14:39:30.039147+00', 16);

-- Insert team
INSERT INTO "public"."teams" ("name", "team_leader", "organization") VALUES
	('DOT', 1, 'DOT Esport');

INSERT INTO "public"."team_members" ("team_id", "player_id", "role") VALUES
	(1, 1, 'Main AWPer');

-- insert strats
INSERT INTO "public"."strats" ("inserted_at", "updated_at", "name", "description", "privacy", "map_id", "team_id", "author_id", "position_id", "team_side", "game_id") VALUES
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'A site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'B site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'C site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'D site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'E site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'F site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'G site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'H site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'I site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'J site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'K site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'L site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'M site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'N site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'O site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'P site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'Q site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'R site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'S site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'T site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'U site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'V site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'W site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'X site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'Y site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2),
	('2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'Z site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2);

INSERT INTO "public"."nades" ("created_at", "name", "type", "lineup_x", "lineup_y", "impact_x", "impact_y", "lineup_img", "impact_img", "strat_id", "notes") VALUES
	('2023-10-13 14:42:20.722825+00', 'CT', 'SMOKE', 84.68, 53.52, 45.6, 78.7, NULL, NULL, 1, 'Jump throw'),
	('2023-10-13 14:42:20.732439+00', 'Stairs', 'SMOKE', 85.56, 58.1, 54.23, 64.26, NULL, NULL, 1, 'Normal throw'),
	('2023-10-13 14:42:20.740904+00', 'Jungle', 'SMOKE', 79.4, 63.38, 50.18, 64.79, NULL, NULL, 1, 'Normal throw'),
	('2023-10-13 14:42:20.748682+00', 'Lamp flash', 'FLASH', 79.05, 53.87, 65.49, 61.97, NULL, NULL, 1, 'Normal throw. Teammates will not get blinded.'),
	('2023-10-13 14:42:20.755833+00', 'Bench molly', 'MOLOTOV', 75, 65.32, 48.77, 69.37, NULL, NULL, 1, 'Makes sure nobody can push through jungle smoke.');
