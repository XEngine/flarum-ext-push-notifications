import app from 'flarum/app';

import PushNotificationsSettingsModal from 'xengine/push-notifications/components/PushNotificationsSettingsModal';

app.initializers.add('xengine-push-notifications', () => {
    app.extensionSettings['xengine-push-notifications'] = () => app.modal.show(new PushNotificationsSettingsModal());
});