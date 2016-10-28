System.register('xengine/push-notifications/Components/PushNotificationHandler', ['flarum/Model', 'flarum/models/User', 'flarum/app'], function (_export) {
    'use strict';

    var Model, User, app, PushNotificationHandler;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel['default'];
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser['default'];
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }],
        execute: function () {
            PushNotificationHandler = (function () {
                function PushNotificationHandler() {
                    babelHelpers.classCallCheck(this, PushNotificationHandler);

                    User.prototype.onesignal_id = Model.attribute('onesignal_id');
                    this._userdata = app.session.user;
                }

                babelHelpers.createClass(PushNotificationHandler, [{
                    key: 'getSignalID',
                    value: function getSignalID() {
                        return this._userdata.attribute('onesignal_id');
                    }
                }, {
                    key: 'setSignalID',
                    value: function setSignalID(signalID) {
                        return this._userdata.save({ onesignal_id: signalID });
                    }
                }, {
                    key: 'checkSignalID',
                    value: function checkSignalID() {
                        var signalID = this.getSignalID();
                        return signalID ? 1 : 0;
                    }
                }]);
                return PushNotificationHandler;
            })();

            _export('default', PushNotificationHandler);
        }
    };
});;
System.register('xengine/push-notifications/Components/SettingsPage', ['flarum/app', 'flarum/components/FieldSet', 'flarum/components/Switch', 'flarum/utils/ItemList', 'xengine/push-notifications/Components/PushNotificationHandler', 'flarum/components/SettingsPage', 'flarum/extend'], function (_export) {
    'use strict';

    var app, FieldSet, Switch, ItemList, PushNotificationHandler, SettingsPage, extend, SettingsPageHandler;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_xenginePushNotificationsComponentsPushNotificationHandler) {
            PushNotificationHandler = _xenginePushNotificationsComponentsPushNotificationHandler['default'];
        }, function (_flarumComponentsSettingsPage) {
            SettingsPage = _flarumComponentsSettingsPage['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }],
        execute: function () {
            SettingsPageHandler = (function () {
                function SettingsPageHandler() {
                    var _this = this;

                    babelHelpers.classCallCheck(this, SettingsPageHandler);

                    this.handler = new PushNotificationHandler();
                    extend(SettingsPage.prototype, 'privacyItems', function (items) {
                        items.add('pushNotifications', FieldSet.component({
                            label: 'Push Notification Status',
                            className: 'PushNotifications-Settings',
                            children: _this.PrivacyItems().toArray()
                        }));
                    });
                }

                babelHelpers.createClass(SettingsPageHandler, [{
                    key: 'PrivacyItems',
                    value: function PrivacyItems() {
                        var _this2 = this;

                        var items = new ItemList();
                        items.add('pushNotificationSwitch', Switch.component({
                            children: 'Allow push notification messages',
                            state: this.handler.checkSignalID(),
                            onchange: function onchange(value, component) {
                                _this2.ChangeTrigger;
                            }
                        }));
                        return items;
                    }
                }, {
                    key: 'ChangeTrigger',
                    value: function ChangeTrigger() {
                        OneSignal.push(function () {
                            OneSignal.registerForPushNotifications({
                                modalPrompt: false
                            });
                            OneSignal.push(function () {
                                OneSignal.on('subscriptionChange', function (isSubscribed) {
                                    if (isSubscribed) {
                                        OneSignal.push(["getUserId", function (userId) {
                                            this.handler.setSignalID(userId);
                                        }]);
                                    }
                                });
                            });
                        });
                        return this.handler.checkSignalID();
                    }
                }]);
                return SettingsPageHandler;
            })();

            _export('default', SettingsPageHandler);
        }
    };
});;
System.register('xengine/push-notifications/main', ['flarum/extend', 'flarum/app', 'xengine/push-notifications/Component/SettingsPage'], function (_export) {
    'use strict';

    var extend, app, SettingsPageHandler;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_xenginePushNotificationsComponentSettingsPage) {
            SettingsPageHandler = _xenginePushNotificationsComponentSettingsPage['default'];
        }],
        execute: function () {

            app.initializers.add('xengine.pushnotifications', function (app) {
                var settingsPage = new SettingsPageHandler();
            });
        }
    };
});