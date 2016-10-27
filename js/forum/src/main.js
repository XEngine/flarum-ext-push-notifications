import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SettingsPage from 'flarum/components/SettingsPage';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import listItems from 'flarum/helpers/listItems';
import ItemList from 'flarum/utils/ItemList';
import User from 'flarum/models/User';
import Model from 'flarum/Model';

app.initializers.add('xengine.pushnotifications', app => {

    extend(SettingsPage.prototype, 'privacyItems', (items) => {
        var pnsave;
        var pnstatus;
        var pnitems;

        pnitems = function () {
            const items = new ItemList();
            items.add('pushNotificationSwitch',
                Switch.component({
                    children: 'Allow push notification messages',
                    state: pnstatus(),
                    onchange: (value, component) => {
                        OneSignal.push(function() {
                            OneSignal.registerForPushNotifications({
                                modalPrompt: true
                            });
                            OneSignal.push(function(){
                                OneSignal.on('subscriptionChange', function (isSubscribed) {
                                    if(isSubscribed){
                                        OneSignal.push(["getUserId", function(userId) {
                                            pnsave(userId);
                                        }]);
                                    }
                                });
                            });
                        });
                     }
                })
            );
            return items;
        }

        pnsave = function (signal_id) {
            app.session.user.save({onesignal_id: signal_id}, {errorHandler: this.onerror.bind(this)})
        };

        pnstatus = function () {
            console.log(app.session.user.OneSignal());
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