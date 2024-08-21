module.exports = cds.service.impl(async function() {
 
    // Step 1: get the object of our OData entities
    const { EmployeeSet } = this.entities;
 
    // Step 2: Validate during the CREATE operation
    this.before('CREATE', EmployeeSet, (req) => {
        const salary = parseInt(req.data.salaryAmount);
        const currency = req.data.currency_code;

        if(salary >= 50000 || currency != 'USD'){
            req.error(500, "Employee’s salary must be less than 50000 USD");
        }
    });

    // Step 3: Log a message after successful insertion
    this.after('CREATE', EmployeeSet, () => {
        console.log('Create operation successful');
    });

    this.before('UPDATE', employeesSet, async(req) => {
       
        var salaryAmount = parseInt(req.data.salaryAmount);
        let Currency_code = req.data.Currency_code;
        let id=req.data.ID;
        let nameFirst=req.data.nameFirst;
        let loginName=req.data.loginName;
        const oldData = await SELECT.from(employeesSet).columns('nameFirst','loginName').where ({ID:id})
        if(salaryAmount>50000 || Currency_code!=='USD'){
            req.error(500,"Employees salary must be less than 50000 USD");
        }else if(nameFirst != oldData[0].nameFirst || loginName!==oldData[0].loginName){
            req.error(500,"Operation not allowed");
        }
    });
 
    this.after('UPDATE',employeesSet, async (req) => {
        console.log('Update Operation Successful');
    });

    this.before('DELETE', EmployeeSet, async(req)=>{
        let id=req.data.ID;
        const pastData = await SELECT.from(EmployeeSet).columns('nameFirst').where ({ID:id});
        console.log(pastData[0].nameFirst[0]);
        if(pastData[0].nameFirst[0] == 'S'){
            req.error(500,'Operation Not Possible');
        }else{
            console.log('DELETE Operation Successful');
        }
    })
}
);