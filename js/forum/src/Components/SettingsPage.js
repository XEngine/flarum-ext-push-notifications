import app from 'flarum/app';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import ItemList from 'flarum/utils/ItemList';
import PushNotificationHandler from 'xengine/push-notifications/Components/PushNotificationHandler';
import SettingsPage from 'flarum/components/SettingsPage';
import {extend} from 'flarum/extend';

export default class SettingsPageHandler {
    constructor() {
        this.handler = new PushNotificationHandler();
        extend(SettingsPage.prototype, 'privacyItems', (items) => {
            items.add('pushNotifications',
                FieldSet.component({
                    label: 'Push Notification Status',
                    className: 'PushNotifications-Settings',
                    children: this.PrivacyItems().toArray()
                })
            );
        })
    }

    PrivacyItems() {
        const items = new ItemList();
        items.add('pushNotificationSwitch',
            Switch.component({
                children: 'Allow push notification messages',
                state: this.handler.checkSignalID(),
                onchange: (value, component) => {
                    this.ChangeTrigger;
                }
            })
        );
        return items
    }

    ChangeTrigger() {
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
}