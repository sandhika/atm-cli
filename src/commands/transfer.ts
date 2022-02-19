import {Command, Flags} from '@oclif/core'
import {Database} from '../config'
import { Sequelize,DataTypes } from 'sequelize';

export default class Transfer extends Command {
  static description = '`transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer'
  static args = [{name: 'target'},{name: 'amount'}]

  public async run(): Promise<void> {
    var db = new Database();
    const {args} = await this.parse(Transfer)

    if(await db.countIsLogin() > 0){
        var dtUser = await db.getCustomerIsLogin();
        var transAmount = await db.setTransaction(dtUser.name,args.target,args.amount,3);

        this.log(`Transfered $${transAmount} to ${args.target}`);
        await db.getCustomerStatus();
    }

  }
}
