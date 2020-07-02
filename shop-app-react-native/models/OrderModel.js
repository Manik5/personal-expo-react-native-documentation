import moment from 'moment';
class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  // solving the issue of "Objects are not valid as a React Child for the date"
  get readableDate() {
    // return this.date.toLocaleDateString('en-EN', {
    // 	year: 'numeric',
    // 	month: 'long',
    // 	day: 'numeric',
    // 	hour: '2-digit',
    // 	minute: '2-digit'
    // });
    return moment(this.date).format('MMMM Do YYYY, hh:mm')
  }
  // solving the issue of "Objects are not valid as a React Child for the date"
}

export default Order;
