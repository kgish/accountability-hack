import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.$.get('https://www.openspending.nl/api/v1/aggregations/documents/?format=json&limit=0');
        //var governments_url = 'http://www.openspending.nl/api/v1/governments/?kind=' + OpenspendingListify.kind + '&limit=500&format=json';
    },

    setupController(controller, model) {
        let kinds = model.facets.kinds.terms.map(t => t.term).sort(),
            years = model.facets.years.terms.map(t => t.term).sort();
        controller.set('years', years);
        controller.set('kinds', kinds);
    }
});
