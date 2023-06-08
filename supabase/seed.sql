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