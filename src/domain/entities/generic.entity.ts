export class Generic {
  constructor(
    private readonly nombre: string,
    private readonly apellido: string,
    private readonly edad: number
  ) {}

  toPrimitives() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad
    };
  }
}