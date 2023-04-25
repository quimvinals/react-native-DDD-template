/**
 * Representation of a stop in the driver route
 *
 * @property stopId -> UUID to identify the stop
 * @property address -> Address of the stop
 * @property sequence -> Index of the stop inside the route
 * @property clientRadius -> A perimeter set for client side delivery
 * @property retailerRadius -> A perimeter set for retailer side delivery
 * @property completed -> If the stop is completed is set as true
 * @property eta -> Time window in which the driver is expected to arrive
 */

export interface IStop {
  stopId: string;
  address: string;
  sequence?: number;
  clientRadius?: number;
  retailerRadius?: number;
  completed?: boolean;
  geoHash: string;

  /**
   * Returns if the order is completed
   * @readonly
   */
  readonly isCompleted: boolean;

  /**
   * Sets completed as true
   * @public
   */
  completeStop: () => void;

  /**
   * Sets completed as false
   * @public
   */
  uncompleteStop: () => void;

  /**
   * Changes the perimeter of the stop
   * @public
   */
  updatePerimeter: (clientRadius: number, retailerRadius: number) => void;

  /**
   * Returns the sequence number of the stop
   * @public
   */
  readonly sequenceNumber: number;
}
