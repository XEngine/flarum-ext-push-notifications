System.register('xengine/push-notifications/components/PushNotificationsSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
    'use strict';

    var SettingsModal, PushNotificationsSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }],
        execute: function () {
            PushNotificationsSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(PushNotificationsSettingsModal, _SettingsModal);

                function PushNotificationsSettingsModal() {
                    babelHelpers.classCallCheck(this, PushNotificationsSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(PushNotificationsSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(PushNotificationsSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'PushNotificationsSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('xengine.pushnotifications.admin.settings.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('xengine.pushnotifications.admin.settings.app_id_label')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('xengine.pushnotifications.app_id') })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                app.translator.trans('xengine.pushnotifications.admin.settings.subdomain_label')
                            ),
                            m(
                                'small',
                                null,
                                app.translator.trans('xengine.pushnotifications.admin.settings.subdomain_description')
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('xengine.pushnotifications.subdomain') })
                        )];
                    }
                }]);
                return PushNotificationsSettingsModal;
            })(SettingsModal);

            _export('default', PushNotificationsSettingsModal);
        }
    };
});;
System.register('xengine/push-notifications/main', ['flarum/app', 'xengine/push-notifications/components/PushNotificationsSettingsModal'], function (_export) {
    'use strict';

    var app, PushNotificationsSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_xenginePushNotificationsComponentsPushNotificationsSettingsModal) {
            PushNotificationsSettingsModal = _xenginePushNotificationsComponentsPushNotificationsSettingsModal['default'];
        }],
        execute: function () {

            app.initializers.add('xengine-push-notifications', function () {
                app.extensionSettings['xengine-push-notifications'] = function () {
                    return app.modal.show(new PushNotificationsSettingsModal());
                };
            });
        }
    };
});