var api = require('./taskApi');

describe('task api', function() {

  var res = {
    send: function(d) {
      if(this.callback) {
        this.callback(d);
      }
    },
    callback: undefined
  };

  afterEach(function() {
    res.callback = undefined;
  });

  it('should return a validation error if hours < 0', function() {
    spyOn(res, 'send').andCallThrough();

    var test = function(data) {
      expect(data.message).toBe('Validation failed');
      expect(data.errors.hours).not.toBe(undefined);
      expect(res.send.calls.length).toEqual(1);
    };

    var req = { body: { hours: -1, workItemId: 'merp' } };

    res.callback = test;
    api.add(req, res);

  });

});
