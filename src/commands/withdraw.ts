import {Command, Flags} from '@oclif/core'
import {Database} from '../config'
import { Sequelize,DataTypes } from 'sequelize';

export default class Withdraw extends Command {
  static description = '`withdraw [amount]` - Withdraws this amount from the logged in customer'
  static args = [{name: 'amount'}]

  public async run(): Promise<void> {
    var db = new Database();
    const {args} = await this.parse(Withdraw)

    if(await db.countIsLogin() > 0){      
      var dtUser = await db.getCustomerIsLogin();
      var transAmount = await db.setTransaction(dtUser.name,dtUser.name,args.amount,2);
      await db.getCustomerStatus();
    }

  }
}
