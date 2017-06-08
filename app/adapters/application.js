import DS from 'ember-data';
import config from 'accountability-hack/config/environment';

export default DS.RESTAdapter.extend({
    // host: 'http://www.openspending.nl',
    // namespace: 'api/v1'
    host: config.apiHost,
    namespace: config.apiNamespace
});
