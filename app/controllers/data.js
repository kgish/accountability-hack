/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

import Ember from 'ember';

export default Ember.Controller.extend({
    years: [],
    year: 0,

    periods: [
        { value: 0, text: 'All' },
        { value: 1, text: '1st quarter' },
        { value: 2, text: '2nd quarter' },
        { value: 3, text: '3rd quarter' },
        { value: 4, text: '4th quarter' }
    ],
    period: 0,

    kinds: [],
    kind: 'select',

    limits: [
        { value: 10,  text: '10' },
        { value: 20,  text: '20' },
        { value: 50,  text: '30' },
        { value: 100, text: '100' },
        { value: 0,   text: 'All' }
    ],
    limit: 10,

    disabled: Ember.computed('kind', function(){
       let kind = this.get('kind');
       return kind === 'select' ? ' disabled' : '';
    }),

    actions: {
        selectYear(year) {
            //console.log('selectYear('+year+')');
            this.set('year', year);
        },
        selectPeriod(period) {
            //console.log('selectPeriod('+period+')');
            this.set('period', period);
        },
        selectKind(kind) {
            //console.log('selectKind('+kind+')');
            this.set('kind', kind);
            Ember.$('#kind option:contains("select")').remove();
        },
        selectLimit(limit) {
            //console.log('selectLimit('+limit+')');
            this.set('limit', limit);
        },
        submit() {
            let year = this.get('year'),
                period = this.get('period'),
                kind = this.get('kind'),
                limit = this.get('limit');
            console.log('submit() year=' + year + ', period=' + period + ', kind=' + kind + ', limit=' + limit);
        }
    }
});
