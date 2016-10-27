<?php
namespace XEngine\PushNotifications\Listener;

use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddAssets{

    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
    }

    public function addAssets(ConfigureWebApp $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js'
            ]);
            $event->addBootstrapper('xengine/push-notifications/main');
        }

        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__.'/../../js/admin/dist/extension.js'
            ]);
            $event->addBootstrapper('xengine/push-notifications/main');
        }
    }

}