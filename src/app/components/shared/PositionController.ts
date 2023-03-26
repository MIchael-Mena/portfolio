interface Position {
  position: number;
}

export class PositionController {
  // Asigna las posiciones a los items, no los ordena
  // TODO: hacer que actualize las posiciones de los items cuando se elimina o se añade uno nuevo

  private readonly positions: number[];
  private readonly actionOnReorder: (item: any) => void;
  private readonly items: Position[];


  constructor(items: Position[], actionOnReorder: (item: any) => void) {
    this.positions = items.map(item => item.position);
    this.actionOnReorder = actionOnReorder;
    this.items = items;
  }

  public reorderPositionsOnDelete(target: number): void {
    // Después de eliminar un item, los items que estaban después del eliminado
    // tienen que bajar una posición
    this.items.forEach(item => {
      if (item.position > target) {
        item.position--;
        this.actionOnReorder(item);
      }
    });
    this.positions.pop()
  }

  public reorderPositionsBySideMovement(): void {
    // Actualizo las posiciones de los items, cuando se mueven de un lado a otro
    this.items.forEach((item, index) => {
      if (item.position !== index + 1) {
        item.position = index + 1;
        this.actionOnReorder(item);
      }
    });
  }


  public reorderPositionsOnAdd(newPosition: number, oldPosition: number): void {
    // Tengo que asignarle la nueva posición a los items, menos a la que se está moviendo
    // el elemento que se inserta desplaza a los demás elementos
    this.items.forEach(item => {
      if (item.position > oldPosition && item.position <= newPosition) {
        item.position--;
        this.actionOnReorder(item);
      } else if (item.position < oldPosition && item.position >= newPosition) {
        item.position++;
        this.actionOnReorder(item);
      }
    });

  }

  public updatePositionsIfChanged(itemIsNew: boolean, newPosition: number, oldPosition: number): void {
    if (this.positionHasChanged(itemIsNew, newPosition, oldPosition))
      this.reorderPositionsOnAdd(newPosition, oldPosition);
  }

  private positionHasChanged(itemIsNew: boolean, newPosition: number, oldPosition: number): boolean {
    const lastPosition = this.positions.length;
    if (lastPosition < 2) {
      return false;
    }
    return itemIsNew ? newPosition !== lastPosition : newPosition !== oldPosition;
  }

  public getPositions(): number[] {
    return this.positions.slice();
  }

  public addPosition(): void {
    this.positions.push(this.positions.length + 1);
  }

  public removePosition(): void {
    this.positions.pop();
  }


}
