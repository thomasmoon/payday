/**
 * Payroll calculation module
 *
 * @author Thomas Moon
 */

export interface EmployeeDay {
    date: string,
    minutes: number
}

export interface Employee {
    id: string,
    name: string,
    time: number,
    overtime: number,
    days: EmployeeDay[]
}

export class PayrollCalc {

    private linesOfInput: string[];
    private employees: Employee[];

    constructor (text: string) {

        // Info to console
        console.log('Initiate payroll calculation');

        // Rows of .csv input file stored as array
        this.linesOfInput = text.split('\n');

        // Objects of employees
        this.employees = [];
    }

    public processRows () {

        // Print input text to console
        // console.log('Process rows:', this.linesOfInput);

        // Evaluate each line of text individually, after header
        for(let i=1; i < this.linesOfInput.length; i++) {

            // Skip this row if we don't have a valid row
            if (!this.linesOfInput[i].length) {
                continue;
            }
              
            // Split row by commma
            let rowData = this.linesOfInput[i].split(',');

            // Deconstruct the parsed row array
            const [
                name,
                employeeId,
                date,
                start,
                end
             ] = rowData;

            // Check if we have an item for this employee
            let existingRowIndex = this.employees.findIndex(findRow=>{
                return findRow.id === employeeId;
            })

            // Get the existing employee record or create a new one
            let existingRow;
            if (existingRowIndex > -1) {
                existingRow = this.employees[existingRowIndex];
            } else {
                existingRow = {
                    id: employeeId,
                    name: name,
                    time: 0,
                    overtime: 0
                }
            }

            //console.log(`${rowData[0]} (${employeeId}) ${date} ${start} - ${end}`);
        }

        console.log('Rows processed');
        return this.printPayroll();
    }
    private printPayroll () {
    }
}