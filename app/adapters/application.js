import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://www.openspending.nl',
    namespace: 'api/v1'
});
