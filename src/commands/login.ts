import {Command, Flags} from '@oclif/core'
import {Database} from '../config'


export default class Login extends Command {
  static description = '`login [name]` - Logs in as this customer and creates the customer if not exist';

  static flags = {
    from: Flags.string({char: 'f', description: 'Whom is saying hello'}),
  }

  static args = [{name: 'name', description: 'Customer name for login', required: true}];


  public async run(): Promise<void> {
    var db = new Database();
    const {args, flags} = await this.parse(Login);
    try {

        //Update islogin=0
        await db.resetLogin();

        // Create if not Find
        var dtUser = await db.getCustomerFromName(args.name);
        await db.setLogin(dtUser.id,1);
        await db.getCustomerStatus();

      } catch (error) {
        console.error('Error:', error);
      }


  }
}
