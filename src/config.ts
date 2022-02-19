import { Sequelize,DataTypes } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/core-litle.db',
  logging: false,
  query:{raw:true}
});

export class Database {


  public async OpenConnection(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }


  public Customers(){
      const Customer = sequelize.define('custs', {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      balance: {
        type: DataTypes.REAL
        // allowNull defaults to true
      },
      islogin: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      }
    }, {
      // Other model options go here
    });

    return Customer;
  }


  public async countIsLogin(){
    var iCount = await this.Customers().count({ where: {islogin:1 }});
    return iCount;
  }

  public async setLogin(Custid:any,status:any){
    await this.Customers().update(
       { islogin: status },
       { where: { id: Custid } }
    );
  }

  public async resetLogin(){
    await this.Customers().update(
     { islogin: 0 },
     { where: { islogin: 1 } }
   );
  }

  private async  incrementBalance(amount:any){
      await this.Customers().update(
        { balance: Sequelize.literal(`balance + ${amount}`) },
        { where: { islogin:1 } }
      );

  }

  private async decrementBalance(amount:any){
      await this.Customers().update(
        { balance: Sequelize.literal(`balance - ${amount}`) },
        { where: { islogin:1 } }
      );
  }

  private async  incrementBalanceById(amount:any,custid:any){
      const user = await this.Customers().findOne({ where: {islogin:1} });
      var dtUser = JSON.parse(JSON.stringify(user));

      await this.Customers().update(
        { balance: Sequelize.literal(`balance + ${amount}`) },
        { where: { id:custid} }
      );

      //if(dtUser.balance < 0){

          //  await this.Debts().update(
        //      { value: Sequelize.literal(`value - ${amount}`) },
          //    { where: {
          //      cust_from: dtUser.id
          //    } }
          //  );

      //}


  }

  private async decrementBalanceById(amount:any,custid:any){
      await this.Customers().update(
        { balance: Sequelize.literal(`balance - ${amount}`) },
        { where: { id:custid } }
      );
  }

  public async getCustomerIsLogin(){
    const user = await this.Customers().findOne({ where: {islogin:1} });
    return JSON.parse(JSON.stringify(user));
  }

  public async getCustomerStatus(){
    const user = await this.Customers().findOne({ where: {islogin:1} });
    var dtUser = JSON.parse(JSON.stringify(user));

    //get Debts TO
    const dtDebtsTo = await this.Debts().findOne({ where: {cust_from:dtUser.id} });

    var iBal =dtUser.balance;

    if(iBal < 0)
      iBal = 0;

    console.log(`Hello, ${dtUser.name}!`);
    console.log(`Your balance is $${iBal}`);

    if(dtDebtsTo){
      var dtDebt = JSON.parse(JSON.stringify(dtDebtsTo));
      //get cust_to
      if(dtDebt.value > 0){
        const CustTos = await this.getCustomerById(dtDebt.cust_to);
        var CustTo = JSON.parse(JSON.stringify(CustTos));

        console.log(`Owed $${dtDebt.value} to ${CustTo.name}`);
      }
    }

    //get Debts From
    const dtDebtsFrom = await this.Debts().findOne({ where: {cust_to:dtUser.id} });
    if(dtDebtsFrom){
      var dtDebt = JSON.parse(JSON.stringify(dtDebtsFrom));
      //get cust_to
      if(dtDebt.value > 0){
          const CustTos = await this.getCustomerById(dtDebt.cust_from);
          var CustTo = JSON.parse(JSON.stringify(CustTos));

          console.log(`Owed $${dtDebt.value} from ${CustTo.name}`);
        }
      }

  }

  private async getCustomer(custname:any){
    const user = await this.Customers().findOne({ where: {name: custname} });
    return JSON.parse(JSON.stringify(user));
  }

  private async getDebtCustomerByName(custname:any){
    const user = await this.Customers().findOne({ where: {name: custname} });
    var dtUser = JSON.parse(JSON.stringify(user));

    const debts = await this.Debts().findOne({ where: {cust_from: dtUser.id} });
    return JSON.parse(JSON.stringify(debts));
  }

  private async getDebtCustomerById(custid:any){
    const debts = await this.Debts().findOne({ where: {cust_from: custid} });
    return JSON.parse(JSON.stringify(debts));
  }

  private async getCustomerById(custid:any){
    const user = await this.Customers().findByPk(custid);
    return JSON.parse(JSON.stringify(user));
  }

  public async getCustomerFromName(custname:any){
    // Create if not Find
    const [user, created] = await this.Customers().findOrCreate({
      where: { name: custname },
      defaults: {
        balance: 0,
        islogin:1
      }});

    return JSON.parse(JSON.stringify(user));
  }

  public Transactions(){
        const Transaction = sequelize.define('trans', {
        // Model attributes are defined here
        cust_from: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },cust_to: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },
        value: {
          type: DataTypes.REAL
          // allowNull defaults to true
        },
        trans_type: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
      });

      // `sequelize.define` also returns the model
      //console.log(Customer === sequelize.models.custs); // true
      return Transaction;
  }

  public Debts(){
        const Debt = sequelize.define('debts', {
        // Model attributes are defined here
        cust_from: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },cust_to: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },
        value: {
          type: DataTypes.REAL
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
      });

      // `sequelize.define` also returns the model
      //console.log(Customer === sequelize.models.custs); // true
      return Debt;
  }

  private async updateDebt(dtFrom:any,dtTo:any,amount:any){
      try{
      const [debt, created] = await this.Debts().findOrCreate({
             where: {
               cust_from: dtFrom,
               cust_to: dtTo
              },
             defaults: {
               value: amount,
               cust_from: dtFrom,
               cust_to: dtTo
             }});

             if(!created){


               await this.Debts().update(
                 { value: Sequelize.literal(`value + ${amount}`) },
                 { where: {
                   cust_from: dtFrom,
                   cust_to: dtTo
                 } }
               );

             }
          } catch (error) {
             console.error('Error updateDebt:', error);
          }
  }

  public async setTransaction(custfrom:any,custto:any,amount:any,type:any=0){
      try{
        var dtFrom = await this.getCustomer(custfrom);
        var dtTo = await this.getCustomer(custto);
        //console.log('type:',type);
        if(type == 1) //Deposit
        {
          if(dtFrom.id == dtTo.id)
          {
            var toBalance= dtTo.balance;
            if(toBalance<0)
            {
              var dtDebt = await this.getDebtCustomerById(dtFrom.id);
              var amountDebt = dtDebt.value;


               // dec Debt
              var debtUpdate =  await this.Debts().update(
                  { value: (amountDebt < amount?0: Sequelize.literal(`value - ${amount}`) ) },
                  { where: {
                    cust_from: dtTo.id
                  } }

              );


              //console.log('data Debt:',dtDebt);
              if(dtDebt){
                var dtFromDebt = await this.getCustomerById(dtDebt.cust_to);
                await this.incrementBalanceById((amountDebt < amount?amountDebt:amount),dtFromDebt.id); //inc balance
                //console.log('debtUpdate:',debtUpdate);
                console.log(`Transferred $${(amountDebt < amount?amountDebt:amount)} to ${dtFromDebt.name}`);
              }
            }

            await this.incrementBalanceById(amount,dtFrom.id); //inc balance

          }


        }else if(type == 2){

          if(dtFrom.id == dtTo.id) //Withdraw
          {
            await this.decrementBalanceById(amount,dtFrom.id); //dec balance
          }


        }


        if(type == 3){ // Transfer

            var incAmount = amount;
            var decAmount = amount;
            var curBalance = dtFrom.balance;
            var modBalance = curBalance - amount;



            if(modBalance < 0){
                await this.updateDebt(dtFrom.id,dtTo.id, (modBalance*(-1)) );
                amount = curBalance;
                incAmount = curBalance;
            }


            var toBalance = dtTo.balance;
            //console.log('toBalance:',toBalance);
            if(toBalance < 0){
              await this.updateDebt(dtTo.id,dtFrom.id, (amount*(-1)) );
              //console.log(`Transferred $${amount} to ${dtFrom.name}`);
            }

            var jsonAmount = {
              incAmount:incAmount,
              decAmount:decAmount,
              curBalance:curBalance,
              modBalance:modBalance,
              toBalance:toBalance
            };

            //console.log('amount: ',jsonAmount);
            await this.incrementBalanceById(Number(incAmount),dtTo.id); //inc balance To
            await this.decrementBalanceById(Number(decAmount),dtFrom.id); //dec balance from

        }


        await this.Transactions().create({
          cust_from: dtFrom.id,
          cust_to: dtTo.id,
          value:amount,
          trans_type: type
        });



        return amount;
    } catch (error) {
      console.error('Error Transfer:', error);
    }

  }


}
