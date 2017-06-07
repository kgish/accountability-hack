import Ember from 'ember';

export default Ember.Controller.extend({
    years: null,
    year: null,

    actions: {
        selectYear(year) {
            console.log('selectYear('+year+')');

        }
    }
});
