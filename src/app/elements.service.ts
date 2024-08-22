import { Injectable } from '@angular/core';
import { Element } from './element';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  private elements = signal<Element[]>([
    {
      id: 0,
      name: 'тест',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
    {
      id: 1,
      name: 'тест2',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'тест3',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
  ]);

  private id: number = 2;
  private getNewId(): number {
    this.id++;
    return this.id;
  }
  addElement(element: Element) {
    this.elements().push({ ...element, id: this.getNewId() });
  }

  updateElement(element: Element) {
    let updatedElement = this.elements().find((item) => {
      return item.id === element.id;
    });

    if (updatedElement) {
      updatedElement.completeIn = element.completeIn;
      updatedElement.description = element.description;
      updatedElement.name = element.name;
    }
  }

  deleteElement(element: Element) {
    this.elements().splice(this.elements().indexOf(element), 1);
  }

  moveElement(element: Element, direction: 'up' | 'down') {
    let index = this.elements().indexOf(element);
    if (direction === 'up') {
      if (index > 0) {
        this.elements().splice(index - 1, 0, element);
        this.elements().splice(index + 1, 1);
      }
    } else if (direction === 'down') {
      if (index < this.elements().length - 1) {
        this.elements().splice(index + 2, 0, element);
        this.elements().splice(index, 1);
      }
    }
  }

  getElements(): Element[] {
    //console.log(this.elements);
    return this.elements();
  }

  constructor() {}
}
