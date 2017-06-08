import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.$.get('http://www.openspending.nl/api/v1/aggregations/documents/?format=json&limit=0');
    },

    setupController(controller, model) {
        let years = model.facets.years.terms.map(t => t.term).sort();
        controller.set('years', years);
    }
});
