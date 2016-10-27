System.register('xengine/push-notifications/main', ['flarum/extend', 'flarum/app', 'flarum/components/SettingsPage', 'flarum/components/FieldSet', 'flarum/components/Switch', 'flarum/helpers/listItems', 'flarum/utils/ItemList', 'flarum/models/User', 'flarum/Model'], function (_export) {
    'use strict';

    var extend, app, SettingsPage, FieldSet, Switch, listItems, ItemList, User, Model;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsSettingsPage) {
            SettingsPage = _flarumComponentsSettingsPage['default'];
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet['default'];
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch['default'];
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser['default'];
        }, function (_flarumModel) {
            Model = _flarumModel['default'];
        }],
        execute: function () {

            app.initializers.add('xengine.pushnotifications', function (app) {

                extend(SettingsPage.prototype, 'privacyItems', function (items) {
                    var pnsave;
                    var pnstatus;
                    var pnitems;

                    pnitems = function () {
                        var items = new ItemList();
                        items.add('pushNotificationSwitch', Switch.component({
                            children: 'Allow push notification messages',
                            state: pnstatus(),
                            onchange: function onchange(value, component) {
                                OneSignal.push(function () {
                                    OneSignal.registerForPushNotifications({
                                        modalPrompt: true
                                    });
                                    OneSignal.push(function () {
                                        OneSignal.on('subscriptionChange', function (isSubscribed) {
                                            if (isSubscribed) {
                                                OneSignal.push(["getUserId", function (userId) {
                                                    pnsave(userId);
                                                }]);
                                            }
                                        });
                                    });
                                });
                            }
                        }));
                        return items;
                    };

                    pnsave = function (signal_id) {
                        app.session.user.save({ onesignal_id: signal_id }, { errorHandler: this.onerror.bind(this) });
                    };

                    pnstatus = function () {
                        console.log(app.session.user.OneSignal());
                        var status = app.session.user.attribute('onesignal_id');
                        return status ? 1 : 0;
                    };

                    items.add('pushNotifications', FieldSet.component({
                        label: 'Push Notification Status',
                        className: 'PushNotifications-Settings',
                        children: pnitems().toArray()
                    }));
                });
            });
        }
    };
});