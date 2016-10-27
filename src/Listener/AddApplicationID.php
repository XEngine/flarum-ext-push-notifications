<?php namespace XEngine\PushNotifications\Listener;

use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;

class AddApplicationID
{
    /**
     * @var SettingsRepository
     */
    protected $settings;


    /**
     * AddTrackingJs constructor.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
    }

    public function addAssets(ConfigureWebApp $event)
    {
        if ($event->isForum()) {
            if ($this->settings->get('xengine.pushnotifications.app_id')) {

                $oneSignalAppID = $this->settings->get('xengine.pushnotifications.app_id');
                $oneSignalSubDomain = $this->settings->get('xengine.pushnotifications.subdomain') ? $this->settings->get('xengine.pushnotifications.subdomain') : '';

                $oneSignalScript = '<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
                                  <script>
                                    var OneSignal = window.OneSignal || [];
                                    OneSignal.push(["init", {
                                      appId: "' . $oneSignalAppID . '",
                                      autoRegister: true, /* Set to true to automatically prompt visitors */   
                                      subdomainName : "' . $oneSignalSubDomain . '",
                                      notifyButton: {
                                          enable: false /* Set to false to hide */
                                      }
                                    }]);
                                    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                                        if (isEnabled)
                                            console.log("Push notifications are enabled!");
                                        else
                                            console.log("Push notifications are not enabled yet.");
                                    });
                                  </script>';
                $event->view->addHeadString($oneSignalScript);
            }
        }
    }
}