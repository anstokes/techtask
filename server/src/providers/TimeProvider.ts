export default class TimeProvider {
  /**
   * The date provider
   */
  #date = Date;

  /**
   * @returns number The current server time, in epoch seconds
   */
  now() {
    return Math.round(new this.#date().getTime() / 1000);
  }
}
