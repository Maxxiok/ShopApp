import moment from 'moment';

export class Order {
    constructor(id, items, total, date){
        this.id= id;
        this.items = items;
        this.total= total;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}
