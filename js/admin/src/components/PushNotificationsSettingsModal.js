import SettingsModal from 'flarum/components/SettingsModal';

export default class PushNotificationsSettingsModal extends SettingsModal {
    className() {
        return 'PushNotificationsSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('xengine-push-notifications.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                <label>{app.translator.trans('xengine-push-notifications.admin.settings.app_id_label')}</label>
                <input className="FormControl" bidi={this.setting('xengine-push-notifications.app_id')}/>
            </div>
        ]
    }
}