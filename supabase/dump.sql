--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd2f1aaf1-67db-4271-a47d-55dc30863eab', '{"action":"user_confirmation_requested","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-10-13 14:37:15.708796+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6c92494-16d0-44be-bcf4-c7685399f13e', '{"action":"user_signedup","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-10-13 14:38:40.413891+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c7603f6-4321-45ba-8925-39dfe09fe91d', '{"action":"logout","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-10-13 14:38:54.327284+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e5d6d9a-af03-44f6-b041-da9fdd4a9c92', '{"action":"user_confirmation_requested","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-10-13 14:39:30.024136+00', ''),
	('00000000-0000-0000-0000-000000000000', '022ef666-8f41-4723-b0f9-d0c9029e29b5', '{"action":"user_signedup","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"team"}', '2023-10-13 14:39:49.435795+00', ''),
	('00000000-0000-0000-0000-000000000000', '239ccfb5-e386-49c3-b255-f885299ad578', '{"action":"logout","actor_id":"2f67d176-15ec-4622-afa3-eeb0a56c10c9","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-10-13 14:40:06.256257+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cfab597-099a-42d6-a144-20d9510655ad', '{"action":"login","actor_id":"1196d029-6157-49de-8c01-9a1e0ceed845","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-10-13 14:40:48.121408+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '2f67d176-15ec-4622-afa3-eeb0a56c10c9', 'authenticated', 'authenticated', 'test2@gmail.com', '$2a$10$NhQxQgWy6elqTF6Vly58eulQDfr5Iolgoj1X5LE1ccIZ88KDkuehm', '2023-10-13 14:39:49.437614+00', NULL, '', '2023-10-13 14:39:30.024976+00', '', NULL, '', '', NULL, '2023-10-13 14:39:49.439177+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-13 14:39:30.019441+00', '2023-10-13 14:39:49.445078+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '1196d029-6157-49de-8c01-9a1e0ceed845', 'authenticated', 'authenticated', 'test1@gmail.com', '$2a$10$3g0p91IinOXcROJMYywNCuxFuHDIRmnPS33H8dcK/.9FJW3v3jC7G', '2023-10-13 14:38:40.415953+00', NULL, '', '2023-10-13 14:37:15.713622+00', '', NULL, '', '', NULL, '2023-10-13 14:40:48.122376+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-13 14:37:15.683265+00', '2023-10-13 14:40:48.127627+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES
	('1196d029-6157-49de-8c01-9a1e0ceed845', '1196d029-6157-49de-8c01-9a1e0ceed845', '{"sub": "1196d029-6157-49de-8c01-9a1e0ceed845", "email": "test1@gmail.com"}', 'email', '2023-10-13 14:37:15.705158+00', '2023-10-13 14:37:15.705205+00', '2023-10-13 14:37:15.705205+00'),
	('2f67d176-15ec-4622-afa3-eeb0a56c10c9', '2f67d176-15ec-4622-afa3-eeb0a56c10c9', '{"sub": "2f67d176-15ec-4622-afa3-eeb0a56c10c9", "email": "test2@gmail.com"}', 'email', '2023-10-13 14:39:30.022766+00', '2023-10-13 14:39:30.022803+00', '2023-10-13 14:39:30.022803+00');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after") VALUES
	('d6acaf01-0c49-4fa8-bb91-58946a27b66e', '1196d029-6157-49de-8c01-9a1e0ceed845', '2023-10-13 14:40:48.122432+00', '2023-10-13 14:40:48.122432+00', NULL, 'aal1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('d6acaf01-0c49-4fa8-bb91-58946a27b66e', '2023-10-13 14:40:48.12831+00', '2023-10-13 14:40:48.12831+00', 'password', '02fece55-15f0-4932-ae0e-3556829e6d95');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 3, 'tfYSyd31oI0qiZKQiipbgA', '1196d029-6157-49de-8c01-9a1e0ceed845', false, '2023-10-13 14:40:48.125308+00', '2023-10-13 14:40:48.125308+00', NULL, 'd6acaf01-0c49-4fa8-bb91-58946a27b66e');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: profile_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profile_pictures" ("id", "created_at", "filename") VALUES
	(1, '2023-10-13 14:34:30.812808+00', 'profile_1.png'),
	(2, '2023-10-13 14:34:31.01568+00', 'profile_2.png'),
	(3, '2023-10-13 14:34:31.01568+00', 'profile_3.png'),
	(4, '2023-10-13 14:34:31.01568+00', 'profile_4.png'),
	(5, '2023-10-13 14:34:31.01568+00', 'profile_5.png'),
	(6, '2023-10-13 14:34:31.01568+00', 'profile_6.png'),
	(7, '2023-10-13 14:34:31.01568+00', 'profile_7.png'),
	(8, '2023-10-13 14:34:31.01568+00', 'profile_8.png'),
	(9, '2023-10-13 14:34:31.01568+00', 'profile_9.png'),
	(10, '2023-10-13 14:34:31.01568+00', 'profile_10.png'),
	(11, '2023-10-13 14:34:31.01568+00', 'profile_11.png'),
	(12, '2023-10-13 14:34:31.01568+00', 'profile_12.png'),
	(13, '2023-10-13 14:34:31.01568+00', 'profile_13.png'),
	(14, '2023-10-13 14:34:31.01568+00', 'profile_14.png'),
	(15, '2023-10-13 14:34:31.01568+00', 'profile_15.png'),
	(16, '2023-10-13 14:34:31.01568+00', 'profile_16.png'),
	(17, '2023-10-13 14:34:31.01568+00', 'profile_17.png'),
	(18, '2023-10-13 14:34:31.01568+00', 'profile_18.png'),
	(19, '2023-10-13 14:34:31.01568+00', 'profile_19.png'),
	(20, '2023-10-13 14:34:31.01568+00', 'profile_20.png');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "uuid", "name", "username", "email", "inserted_at", "updated_at", "profile_picture") VALUES
	(1, '1196d029-6157-49de-8c01-9a1e0ceed845', 'Test User 1', 'test_user1', 'test1@gmail.com', '2023-10-13 14:37:15.800209+00', '2023-10-13 14:37:15.800209+00', 20),
	(2, '2f67d176-15ec-4622-afa3-eeb0a56c10c9', 'Test User 2', 'Test2', 'test2@gmail.com', '2023-10-13 14:39:30.039147+00', '2023-10-13 14:39:30.039147+00', 16);


--
-- Data for Name: bug_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."games" ("id", "created_at", "short_name", "full_name") VALUES
	(1, '2023-10-13 14:34:30.967612+00', 'CS:GO', 'Counter-Strike: Global Offensive'),
	(2, '2023-10-13 14:34:30.967612+00', 'CS2', 'Counter-Strike 2');


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."maps" ("id", "created_at", "name", "thumbnail", "radar") VALUES
	(1, '2023-10-13 14:34:31.01568+00', 'Ancient', '/assets/images/thumbnails/ancient_compressed.webp', '/assets/images/radars/de_ancient.webp'),
	(2, '2023-10-13 14:34:31.01568+00', 'Anubis', '/assets/images/thumbnails/anubis_compressed.webp', '/assets/images/radars/de_anubis.webp'),
	(3, '2023-10-13 14:34:31.01568+00', 'Inferno', '/assets/images/thumbnails/inferno_compressed.webp', '/assets/images/radars/de_inferno.webp'),
	(4, '2023-10-13 14:34:31.01568+00', 'Mirage', '/assets/images/thumbnails/mirage_compressed.webp', '/assets/images/radars/de_mirage.webp'),
	(5, '2023-10-13 14:34:31.01568+00', 'Nuke', '/assets/images/thumbnails/nuke_compressed.webp', '/assets/images/radars/de_nuke.webp'),
	(6, '2023-10-13 14:34:31.01568+00', 'Overpass', '/assets/images/thumbnails/overpass_compressed.webp', '/assets/images/radars/de_overpass.webp'),
	(7, '2023-10-13 14:34:31.01568+00', 'Vertigo', '/assets/images/thumbnails/vertigo_compressed.webp', '/assets/images/radars/de_vertigo.webp');


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."positions" ("id", "created_at", "name", "img", "map_id") VALUES
	(1, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 1),
	(2, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 1),
	(3, '2023-10-13 14:34:31.01568+00', 'Banan', 'banan.webp', 1),
	(4, '2023-10-13 14:34:31.01568+00', 'Mid', 'mid.webp', 1),
	(5, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 2),
	(6, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 2),
	(7, '2023-10-13 14:34:31.01568+00', 'Mid', 'mid.webp', 2),
	(8, '2023-10-13 14:34:31.01568+00', 'Water', 'water.webp', 2),
	(9, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 3),
	(10, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 3),
	(11, '2023-10-13 14:34:31.01568+00', 'Banan', 'banan.webp', 3),
	(12, '2023-10-13 14:34:31.01568+00', 'Top mid', 'top_mid.webp', 3),
	(13, '2023-10-13 14:34:31.01568+00', 'Apps', 'apps.webp', 3),
	(14, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 4),
	(15, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 4),
	(16, '2023-10-13 14:34:31.01568+00', 'Mid', 'mid.webp', 4),
	(17, '2023-10-13 14:34:31.01568+00', 'Palace', 'palace.webp', 4),
	(18, '2023-10-13 14:34:31.01568+00', 'B apps', 'b_apps.webp', 4),
	(19, '2023-10-13 14:34:31.01568+00', 'Short', 'short.webp', 4),
	(20, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 5),
	(21, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 5),
	(22, '2023-10-13 14:34:31.01568+00', 'Outside', 'outside.webp', 5),
	(23, '2023-10-13 14:34:31.01568+00', 'Lobby', 'lobby.webp', 5),
	(24, '2023-10-13 14:34:31.01568+00', 'Ramp', 'ramp.webp', 5),
	(25, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 6),
	(26, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 6),
	(27, '2023-10-13 14:34:31.01568+00', 'Long', 'long.webp', 6),
	(28, '2023-10-13 14:34:31.01568+00', 'Banan', 'banan.webp', 6),
	(29, '2023-10-13 14:34:31.01568+00', 'Fountain', 'fountain.webp', 6),
	(30, '2023-10-13 14:34:31.01568+00', 'Connector', 'connector.webp', 6),
	(31, '2023-10-13 14:34:31.01568+00', 'Monster entrance', 'monster_entrance.webp', 6),
	(32, '2023-10-13 14:34:31.01568+00', 'Sewage', 'sewage.webp', 6),
	(33, '2023-10-13 14:34:31.01568+00', 'A site', 'a_site.webp', 7),
	(34, '2023-10-13 14:34:31.01568+00', 'B site', 'b_site.webp', 7),
	(35, '2023-10-13 14:34:31.01568+00', 'A ramp', 'a_ramp.webp', 7),
	(36, '2023-10-13 14:34:31.01568+00', 'B ramp', 'b_ramp.webp', 7),
	(37, '2023-10-13 14:34:31.01568+00', 'Mid', 'mid.webp', 7);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: strats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."strats" ("id", "inserted_at", "updated_at", "name", "description", "privacy", "map_id", "team_id", "author_id", "position_id", "team_side", "game_id") VALUES
	(1, '2023-10-13 14:42:20.704966+00', '2023-10-13 14:42:20.704966+00', 'A site execute', 'Full a site execute', 'PUBLIC', 4, NULL, 1, 14, 'T', 2);


--
-- Data for Name: nades; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."nades" ("id", "created_at", "name", "type", "lineup_x", "lineup_y", "impact_x", "impact_y", "lineup_img", "impact_img", "strat_id", "notes") VALUES
	(1, '2023-10-13 14:42:20.722825+00', 'CT', 'SMOKE', 84.68, 53.52, 45.6, 78.7, NULL, NULL, 1, 'Jump throw'),
	(2, '2023-10-13 14:42:20.732439+00', 'Stairs', 'SMOKE', 85.56, 58.1, 54.23, 64.26, NULL, NULL, 1, 'Normal throw'),
	(3, '2023-10-13 14:42:20.740904+00', 'Jungle', 'SMOKE', 79.4, 63.38, 50.18, 64.79, NULL, NULL, 1, 'Normal throw'),
	(4, '2023-10-13 14:42:20.748682+00', 'Lamp flash', 'FLASH', 79.05, 53.87, 65.49, 61.97, NULL, NULL, 1, 'Normal throw. Teammates will not get blinded.'),
	(5, '2023-10-13 14:42:20.755833+00', 'Bench molly', 'MOLOTOV', 75, 65.32, 48.77, 69.37, NULL, NULL, 1, 'Makes sure nobody can push through jungle smoke.');


--
-- Data for Name: profiles_backup; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "name") VALUES
	(1, 'USER'),
	(2, 'MODERATOR'),
	(3, 'ADMIN');


--
-- Data for Name: team_invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_roles" ("id", "user_id", "role_id") VALUES
	(1, 1, 1),
	(2, 2, 1);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types") VALUES
	('strats', 'Strats', NULL, '2023-10-13 14:34:30.937505+00', '2023-10-13 14:34:30.937505+00', false, false, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 3, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: bug_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."bug_reports_id_seq"', 1, false);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."games_id_seq"', 2, true);


--
-- Name: maps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."maps_id_seq"', 7, true);


--
-- Name: nades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."nades_id_seq"', 5, true);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."positions_id_seq"', 37, true);


--
-- Name: profile_pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."profile_pictures_id_seq"', 20, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."profiles_id_seq"', 2, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roles_id_seq"', 3, true);


--
-- Name: strats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."strats_id_seq"', 1, true);


--
-- Name: team_invitations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_invitations_id_seq"', 1, false);


--
-- Name: team_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."team_members_id_seq"', 1, false);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."teams_id_seq"', 1, false);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."user_roles_id_seq"', 2, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
