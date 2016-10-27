import app from 'flarum/app';

app.initializers.add('xengine-push-notifications', app => {
    console.log(app.store.getById('xengine-push-notifications'))
});