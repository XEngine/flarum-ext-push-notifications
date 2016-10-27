<?php
namespace XEngine\PushNotifications;

use Flarum\Core\User;
use Flarum\Database\AbstractModel;

class OneSignal extends AbstractModel
{
    protected $table = 'users';
    protected $column = 'onesignal_id';

    public static function boot()
    {
        parent::boot();
    }

    public static function build(User $user, $onesignal_id)
    {
        $onesignal = new static;
        $onesignal->user = $user;
        $onesignal->onesignal_id = $onesignal_id;

        return $onesignal;
    }
}