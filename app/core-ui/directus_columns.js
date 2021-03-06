//  Date core UI component
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

// Attribute          Type              Contains                                Example
// -------------------------------------------------------------------------------------------------------------------------------------
// options.schema     Backbone.Model    Structure/Schema for this table row     options.schema.get('type') [column_name, comment, type]
// options.model      Backbone.Model    Data/Model for this table row           options.model.get('id') [any column in current table row]
// options.value      String            Value for this field
// options.settings   Backbone.Model    Saved values for current UI options     options.settings.get('length') [any key from this UI options]
// options.name       String            Field name


define(['app', 'backbone'], function(app, Backbone) {

  'use strict';

  var Module = {};

  Module.id = 'directus_columns';
  Module.dataTypes = ['VARCHAR'];

  Module.variables = [];

  var template =  '{{#columns}}<label><input type="checkbox" name="{{../name}}" value="{{columnName}}" {{#if selected}}checked{{/if}}>{{title}}</label>{{/columns}}';

  Module.Input = Backbone.Layout.extend({

    tagName: 'div',

    attributes: {
      'class': 'field'
    },

    template: Handlebars.compile(template),

    events: {},

    serialize: function() {
      return {
        name: this.options.name,
        note: this.options.schema.get('comment'),
        columns: this.columns
      };
    },

    initialize: function(options) {
      var table = options.model.getTable();
      var tableName = table.id;
      var columns = app.schemaManager.getColumns[tableName].pluck('column_name');
      var selected = this.options.value ? this.options.value.split(',') : [];

      this.columns = _.map(columns, function(value) {
        var item = {
          columnName: value,
          title: app.capitalize(value)
        };

        if (_.contains(selected, value)) item.selected = true;

        return item;
      });

    }

  });

  Module.validate = function(value) {
    //
  };

  Module.list = function(options) {
    return options.value;
  };

  return Module;

});