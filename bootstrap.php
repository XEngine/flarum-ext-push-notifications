<?php

use Illuminate\Contracts\Events\Dispatcher;
use XEngine\PushNotifications\Listener;

return function (Dispatcher $events) {
    $events->subscribe(Listener\AddAssets::class);
    $events->subscribe(Listener\AddApplicationID::class);
    $events->subscribe(Listener\AddUserAttributes::class);
    $events->subscribe(Listener\UpdateUserAttributes::class);
};