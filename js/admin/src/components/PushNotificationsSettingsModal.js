import SettingsModal from 'flarum/components/SettingsModal';

export default class PushNotificationsSettingsModal extends SettingsModal {
    className() {
        return 'PushNotificationsSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('xengine.pushnotifications.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                <label>{app.translator.trans('xengine.pushnotifications.admin.settings.app_id_label')}</label>
                <input className="FormControl" bidi={this.setting('xengine.pushnotifications.app_id')}/>
            </div>,
            <div className="Form-group">
                <label>{app.translator.trans('xengine.pushnotifications.admin.settings.subdomain_label')}</label>
                <small>{app.translator.trans('xengine.pushnotifications.admin.settings.subdomain_description')}</small>
                <input className="FormControl" bidi={this.setting('xengine.pushnotifications.subdomain')}/>
            </div>
        ]
    }
}