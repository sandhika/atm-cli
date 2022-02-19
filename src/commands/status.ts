import {Command, Flags} from '@oclif/core'
import {Database} from '../config'

export default class Status extends Command {
  static description = 'describe the command here'

  static args = [{name: 'name'}]

  public async run(): Promise<void> {
    var db = new Database();
    const {args} = await this.parse(Status)
    await db.getCustomerStatus();

  }
}
