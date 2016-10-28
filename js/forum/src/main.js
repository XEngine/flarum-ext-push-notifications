import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SettingsPage from 'flarum/components/SettingsPage';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import ItemList from 'flarum/utils/ItemList';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import UserInjection from 'xengine/push-notifications/UserInjection';

app.initializers.add('xengine.pushnotifications', app => {
    extend(SettingsPage.prototype, 'privacyItems', (items) => {
        User.prototype.onsignal_id = Model.attribute('onesignal_id');

        var pnsave;
        var pnstatus;
        var pnitems;

        pnitems = function () {
            const items = new ItemList();
            var status = pnstatus();
            items.add('pushNotificationSwitch',
                Switch.component({
                    children: 'Allow push notification messages',
                    state: status,
                    onchange: (value, component) => {
                        if(status){
                            app.session.user.save({onesignal_id: null})
                        }else {
                            OneSignal.push(function () {
                                OneSignal.registerForPushNotifications({
                                    modalPrompt: true
                                });
                                OneSignal.push(function () {
                                    OneSignal.on('subscriptionChange', function (isSubscribed) {
                                        if (isSubscribed) {
                                            OneSignal.push(["getUserId", function (userId) {
                                                app.session.user.save({onesignal_id: userId})
                                            }]);
                                        }
                                    });
                                });
                            });
                        }
                    }
                })
            );
            return items;
        }

        pnsave = function (signal_id) {
            app.session.user.save({onesignal_id: signal_id})
        };

        pnstatus = function () {
            var status = app.session.user.attribute('onesignal_id');
            return status ? 1 : 0;
        };

        items.add('pushNotifications',
            FieldSet.component({
                label: 'Push Notification Status',
                className: 'PushNotifications-Settings',
                children: pnitems().toArray()
            })
        );
    });
});