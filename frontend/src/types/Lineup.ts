export type Lineup = {
  id: number,
  name: string,
  desc: string,
  nade: 'SMOKE' | 'FLASH' | 'MOLOTOV' | 'HE',
  throwCoordinateX: number,
  throwCoordinateY: number,
  landCoordinateX: number,
  landCoordinateY: number,
  videoPath: string
}