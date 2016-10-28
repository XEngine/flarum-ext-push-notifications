import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SettingsPageHandler from 'xengine/push-notifications/Components/SettingsPage';

app.initializers.add('xengine.pushnotifications', app => {
    let settingsPage = new SettingsPageHandler(app.session.user);
});