import { action, computed, makeObservable, observable } from 'mobx';

import { IStop } from './stop.interface';

export class Stop implements IStop {
  public stopId: string;
  public address: string;
  public clientRadius?: number;
  public completed?: boolean;
  public retailerRadius?: number;
  public geoHash: string;

  constructor(stopId: string, address?: string, completed?: boolean) {
    this.stopId = stopId;
    this.completed = completed;
    this.address = address;

    makeObservable(this, {
      completeStop: action,
      completed: observable,
      isCompleted: computed,
      stopId: observable,
      uncompleteStop: action,
      updatePerimeter: action,
    });
  }

  sequence?: number;

  public completeStop() {
    this.completed = true;
  }

  public uncompleteStop() {
    this.completed = false;
  }

  get isCompleted(): boolean {
    return this.completed;
  }

  public updatePerimeter(clientRadius: number, retailerRadius: number) {
    this.clientRadius = clientRadius;
    this.retailerRadius = retailerRadius;
  }

  public get sequenceNumber(): number {
    return 0;
  }
}
