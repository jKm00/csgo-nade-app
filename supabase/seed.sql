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
('Anubis', '/assets/images/thumbnails/anubis_compressed.webp', '/assets/images/radars/anubis.webp'),
('Inferno', '/assets/images/thumbnails/inferno_compressed.webp', '/assets/images/radars/de_inferno.webp'),
('Mirage', '/assets/images/thumbnails/mirage_compressed.webp', '/assets/images/radars/de_mirage.webp'),
('Nuke', '/assets/images/thumbnails/nuke_compressed.webp', '/assets/images/radars/de_nuke.webp'),
('Overpass', '/assets/images/thumbnails/overpass_compressed.webp', '/assets/images/radars/de_overpass.webp'),
('Vertigo', '/assets/images/thumbnails/vertigo_compressed.webp', '/assets/images/radars/de_vertigo.webp');