<?php

use Illuminate\Contracts\Events\Dispatcher;
use XEngine\PushNotifications\Listener;

return function (Dispatcher $events) {
    $events->subscribe(Listener\AddClientAssets::class);
};