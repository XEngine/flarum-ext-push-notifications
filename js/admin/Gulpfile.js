var flarum = require('flarum-gulp');

flarum({
    modules: {
        'xengine/push-notifications': [
            'src/**/*.js'
        ]
    }
});