export class Claimrequest {
  id: number;
  transferamount: string;
  currencycode: string;
  isclaimed: string;
  transactionid: string;
  areacode: number;
  charges: string;
  fees: string;
  firstname: string;
  fromcurrency: string;
  fromcurrencycode: string;
  lastname: string;
  mobilenumber: number;
  originalAmount: number;
  recievername: string;
  securityanswer: string;
  securityquestion: string;
  senderaccountnumber: string;
  senderareacode: string;
  sendermobilenumber: number;
  sendername: string;
  transactionpin: string;
  userid: string;
  messagetext: string;
  isclaimtext: string;

  constructor(customer) {
    this.id = customer.id;
    this.transferamount = customer.transferamount;
    this.currencycode = customer.currencycode;
    this.isclaimed = customer.isclaimed;
    this.transactionid = customer.transactionid;
    this.areacode = customer.areacode;
    this.charges = customer.charges;
    this.fees = customer.fees;
    this.firstname = customer.firstname;
    this.fromcurrency = customer.fromcurrency;
    this.fromcurrencycode = customer.fromcurrencycode;
    this.lastname = customer.lastname;
    this.mobilenumber = customer.mobilenumber;
    this.originalAmount = customer.originalAmount;
    this.recievername = customer.recievername;
    this.securityanswer = customer.securityanswer;
    this.securityquestion = customer.securityquestion;
    this.senderaccountnumber = customer.senderaccountnumber;
    this.senderareacode = customer.senderareacode;
    this.sendermobilenumber = customer.sendermobilenumber;
    this.sendername = customer.sendername;
    this.transactionpin = customer.transactionpin;
    this.userid = customer.userid;
    this.messagetext = customer.messagetext;
    this.isclaimtext = customer.isclaimtext;

  }
}
