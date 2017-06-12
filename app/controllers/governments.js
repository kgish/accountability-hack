/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import Ember from 'ember';

export default Ember.Controller.extend({

    kind: 'county',

    // Available columns:
    // { propertyName: "code",         title: "Code" },
    // { propertyName: "country",      title: "Country" },
    // { propertyName: "display_kind", title: "Display Kind" },
    // { propertyName: "id",           title: "Id" },
    // { propertyName: "intro",        title: "Intro" },
    // { propertyName: "kind",         title: "Kind" },
    // { propertyName: "lat",          title: "Latitude" },
    // { propertyName: "location",     title: "Location" },
    // { propertyName: "lon",          title: "Longitude" },
    // { propertyName: "name",         title: "Name" },
    // { propertyName: "resource_uri", title: "Resource URI" },
    // { propertyName: "slug",         title: "Slug" },
    // { propertyName: "state",        title: "State" },
    // { propertyName: "website",      title: "Website" }

    columns: Ember.computed('kind', function(){
        let kind = this.get('kind'),
            columns = [],

            list = [{
                name: 'county',
                columns: [
                    { propertyName: "code",         title: "Code" },
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "state",        title: "State", filterWithSelect: true }
                ]
            },
            {
                name: 'benchmark',
                columns: [
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "intro",        title: "Intro" },
                    { propertyName: "location",     title: "Location", filterWithSelect: true }
                ]
            },
            {
                name: 'municipal_arrangement',
                columns: [
                    { propertyName: "code",         title: "Code" },
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "location",     title: "Location" },
                    { propertyName: "state",        title: "State", filterWithSelect: true }
                ]
            },
            {
                name: 'province',
                columns: [
                    { propertyName: "code",         title: "Code" },
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "state",        title: "State" }
                ]
            },
            {
                name: 'subcounty',
                columns: [
                    { propertyName: "code",         title: "Code" },
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "state",        title: "State" }
                ]
            },
            {
                name: 'watership',
                columns: [
                    { propertyName: "code",         title: "Code" },
                    { propertyName: "name",         title: "Name" },
                    { propertyName: "state",        title: "State" }
                ],
            }];

        let found = list.findBy('name', kind);
        if (found) {
            columns = found.columns;
        } else {
           console.error('Cannot find columns for kind='+kind);
        }

        return columns;
    }),

    filteredGovernments: Ember.computed('governments', 'kind', function(){
        let governments = this.get('governments');
        return governments.filterBy('kind', this.get('kind'));
    }),

    // Custom icons for the ember-models-table addon
    icons: {
        "sort-asc": "fa fa-caret-down",
        "sort-desc": "fa fa-caret-up",
        // "column-visible": "glyphicon glyphicon-check",
        // "column-hidden": "glyphicon glyphicon-unchecked",
        // "nav-first": "glyphicon glyphicon-chevron-left",
        // "nav-prev": "glyphicon glyphicon-menu-left",
        // "nav-next": "glyphicon glyphicon-menu-right",
        // "nav-last": "glyphicon glyphicon-chevron-right",
        // "caret": "icons-caret"
        // "expand-row": "glyphicon glyphicon-plus",
        // "expand-all-rows": "glyphicon glyphicon-plus",
        // "collapse-row": "glyphicon glyphicon-minus",
        // "collapse-all-rows": "glyphicon glyphicon-minus",
        // "select-all-rows": "glyphicon glyphicon-check",
        // "deselect-all-rows": "glyphicon glyphicon-unchecked",
        // "select-row": "glyphicon glyphicon-check",
        // "deselect-row": "glyphicon glyphicon-unchecked"
    },

    actions: {
        selectKind(kind) {
            this.set('kind', kind);
        }
    }
});
