export class Ejercicio {
  public name: string;
  public sets: number;
  public reps: number;
  public pause: {
    min: number;
    sec: number;
  };
  public weight: number;

  constructor(
    name: string,
    sets: number,
    reps: number,
    {
      min,
      sec,
    }: {
      min: number;
      sec: number;
    },
    weight: number
  ) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.pause = { min, sec };
    this.weight = weight;
  }
}
