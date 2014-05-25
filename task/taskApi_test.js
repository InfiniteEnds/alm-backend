var api = require('./taskApi');

describe('task api', function() {

  it('should return a validation error if hours < 0', function(done) {

    var req = { hours: -1, workItemId: 'merp' };
    api.validate(req, function(data) {
      expect(data.message).toBe('Validation failed');
      expect(data.errors.hours).not.toBe(undefined);
      done();
    });

  });

  /**
   * Note: Mongoose converts Number, Array, and Boolean to String
   *   Trying to catch this with a custom validator does not work
   *   null, undefined, and Object evaluate properly -- tgraham 05.25.14
   */
  it('should return a validation error if workItemId is not a string', function(done) {

    var req = { hours: 1, workItemId: undefined };
    api.validate(req, function(data) {
      expect(data.message).toBe('Validation failed');
      expect(data.errors.workItemId).not.toBe(undefined);
      done();
    });

  });

});
