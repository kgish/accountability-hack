/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

import Ember from 'ember';

export default Ember.Controller.extend({

    years: [],
    year: 0,

    periods: [
        { value: 0, text: 'Year' },
        { value: 1, text: '1st quarter' },
        { value: 2, text: '2nd quarter' },
        { value: 3, text: '3rd quarter' },
        { value: 4, text: '4th quarter' },
    ],
    period: 0,

    kinds: [ 'subcounty', 'county', 'province', 'watership', 'municipal arrangement', 'benchmark' ],
    kind: 'Select',

    plans: [
        { value: 'budget', text: 'Budget' },
        { value: 'spending', text: 'Spending' },
    ],
    plan: 'Select',

    directions: [
        { value: 'in', text: 'In' },
        { value: 'out', text: 'Out' },
    ],
    direction: 'Select',

    orders: [
        { value: 'asc', text: 'Ascending' },
        { value: 'desc', text: 'Descending' },
    ],
    order: 'Select',

    limits: [
        { value: 1,   text: '1' },
        { value: 10,  text: '10' },
        { value: 20,  text: '20' },
        { value: 50,  text: '50' },
        { value: 100, text: '100' },
        { value: 0,   text: 'No limit' }
    ],
    limit: 1,

    disabled: Ember.computed('kind', 'plan', 'order', 'direction', function(){
        let kind = this.get('kind'),
            plan = this.get('plan'),
            order = this.get('order'),
            direction = this.get('direction'),
            result = (
                kind === 'Select' ||
                plan === 'Select' ||
                order === 'Select' ||
                direction === 'Select'
            );
        console.log('disabled() => ' + result);
       return  result ? ' disabled' : '';
    }),

    labels: null,

    actions: {
        selectYear(year) {
            console.log('selectYear('+year+')');
            this.set('year', year);
            this._showValues();
        },
        selectPeriod(period) {
            console.log('selectPeriod('+period+')');
            this.set('period', period);
            this._showValues();
        },
        selectKind(kind) {
            console.log('selectKind('+kind+')');
            this.set('kind', kind);
            Ember.$('#kind option:contains("Select")').remove();
            this._showValues();
        },
        selectPlan(plan) {
            console.log('selectPlan('+plan+')');
            this.set('plan', plan);
            Ember.$('#plan option:contains("Select")').remove();
            this._showValues();
        },
        selectDirection(direction) {
            console.log('selectDirection('+direction+')');
            this.set('direction', direction);
            Ember.$('#direction option:contains("Select")').remove();
            this._showValues();
        },
        selectOrder(order) {
            console.log('selectOrder('+order+')');
            this.set('order', order);
            Ember.$('#order option:contains("Select")').remove();
            this._showValues();
        },
        selectLimit(limit) {
            console.log('selectLimit('+limit+')');
            this.set('limit', limit);
            this._showValues();
        },
        submit() {
            this._showValues();
            let year = parseInt(this.get('year')),
                period = parseInt(this.get('period')),
                kind = this.get('kind'),
                plan = this.get('plan'),
                direction = this.get('direction'),
                order = this.get('order'),
                limit = parseInt(this.get('limit')),
                url_documents = 'http://www.openspending.nl/api/v1/documents/' +
                '?government__kind=' + kind +
                (year ? '&year=' + year : '') +
                '&period=' + period +
                '&plan=' + plan +
                '&direction=' + direction +
                '&limit=' + limit +
                '&format=json';

            console.log(url_documents);
            Ember.$.get(url_documents).then(
                data => {
                    console.log(data);
                    let url_labels = 'http://www.openspending.nl/api/v1/labels/' +
                        '?document_id=' + data.objects[0].id +
                        '&limit=500' +
                        '&format=json';
                    console.log(url_labels);
                    Ember.$.get(url_labels).then(
                        data => {
                            console.log(data);
                            let objs = data.objects.filter(function (l) { return (l.direction == direction);}),
                                labels = [];
                            console.log(objs);

                            objs.forEach(function(obj){
                                labels.push({
                                    code: obj.code,
                                    direction: obj.direction,
                                    document_id: obj.document_id,
                                    label: obj.label,
                                    resource_uri: obj.resource_uri,
                                    slug: obj.slug,
                                    type: obj.type
                                });
                            });

                            this.set('labels', labels);
                        },
                        error => {
                            console.error(error);
                        }
                    );
                },
                error => {
                    console.error(error);
                }
            );
        }
    },

    // Private
    _showValues() {
        let year = this.get('year'),
            period = this.get('period'),
            kind = this.get('kind'),
            plan = this.get('plan'),
            direction = this.get('direction'),
            order = this.get('order'),
            limit = this.get('limit');
        console.log('submit() ' +
            'year=' + year +
            ', period=' + period +
            ', kind=' + kind +
            ', plan=' + plan +
            ', direction=' + direction +
            ', order=' + order +
            ', limit=' + limit
        );
    }
});
