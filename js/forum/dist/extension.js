System.register('xengine/push-notifications/main', ['flarum/app'], function (_export) {
    'use strict';

    var app;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }],
        execute: function () {

            app.initializers.add('xengine-push-notifications', function (app) {
                console.log(app.store);
            });
        }
    };
});