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