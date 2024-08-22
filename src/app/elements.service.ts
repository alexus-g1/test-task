import { Injectable } from '@angular/core';
import { Element } from './element';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  elements = signal<Element[]>([
    {
      name: 'тест',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
    {
      name: 'тест2',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
    {
      name: 'тест3',
      description: 'test',
      completeIn: new Date(),
      createdAt: new Date(),
    },
  ]);

  addElement(element: Element) {
    this.elements().push(element);
    //console.log(this.elements);
  }

  updateElement(element: Element) {
    let updatedElement = this.elements().find((item) => {
      console.log(element);
      return element.createdAt.getTime() === item.createdAt.getTime();
    });

    if (updatedElement) {
      updatedElement.completeIn = element.completeIn;
      updatedElement.description = element.description;
      updatedElement.name = element.name;
    }
    console.log(updatedElement);
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

  getElement(id: number) {
    return this.elements()[id];
  }
  constructor() {
    console.log(this.elements);
  }
}
