export class Allcards {
    id: number;
    ccnumber: string;
    ccexpiry: string;
    cardtype: string;
    isdefault: string;
    idCuenta: string;
    idPlastico: string;
    idAsociado: string;
    firstname: string;
    lastname: string;
    fullname: string;
    cvv: string;
  
    constructor(customer) {
      this.id = customer.id;
      this.ccnumber = customer.ccnumber;
      this.ccexpiry = customer.ccexpiry;
      this.cardtype = customer.cardtype;
      this.isdefault = customer.isdefault;
      this.idCuenta = customer.idCuenta;
      this.idPlastico = customer.idPlastico;
      this.idAsociado = customer.idAsociado;
      this.firstname = customer.firstname;
      this.lastname = customer.lastname;
      this.fullname = customer.fullname;
      this.cvv = customer.cvv;
    }
  
    get name() {
      return this.ccnumber;
    }
  
    set name(value) {
    }
  
  }