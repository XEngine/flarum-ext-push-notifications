import Model from 'flarum/Model';
import User from 'flarum/models/User';
import app from 'flarum/app';

export default class PushNotificationHandler {
    constructor(userSession) {
        User.prototype.onesignal_id = Model.attribute('onesignal_id');
        this._userdata = userSession;
    }

    getSignalID() {
        return this._userdata.attribute('onesignal_id');
    }

    setSignalID(signalID) {
        return this._userdata.save({onesignal_id: signalID});
    }

    checkSignalID(){
        let signalID = this.getSignalID();
        return signalID ? 1 : 0;
    }
}