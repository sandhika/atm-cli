import {Command, Flags} from '@oclif/core'
import {Database} from '../config'

export default class Logout extends Command {
  static description = 'Logs out of the current customer'




  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    var db = new Database();
    const {args} = await this.parse(Logout)

    await db.Customers().findOne({ where: {islogin:1} }).then(async user => {
        var dtUser = JSON.parse(JSON.stringify(user));
        this.log(`Goodbye, ${dtUser.name}!`);

        await db.Customers().update(
         { islogin: 0 },
         { where: { islogin: 1 } }
       );

    })


  }
}
