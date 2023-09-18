import TimeInterface from '../interfaces/TimeInterface';

export default class TimeService implements TimeInterface {
  /**
   * The time provider
   */
  #timeProvider;

  /**
   * Constructor
   */
  constructor({ TimeProvider }: { TimeProvider: TimeInterface }) {
    this.#timeProvider = TimeProvider;
  }

  /**
   * @returns number The current server time, in epoch seconds
   */
  now() {
    return this.#timeProvider.now();
  }
}
