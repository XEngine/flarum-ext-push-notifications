import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SettingsPageHandler from 'xengine/push-notifications/Component/SettingsPage';

app.initializers.add('xengine.pushnotifications', app => {
    let settingsPage = new SettingsPageHandler();
});