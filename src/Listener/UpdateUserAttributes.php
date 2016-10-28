<?php
namespace XEngine\PushNotifications\Listener;

use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Event\UserWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;

class UpdateUserAttributes
{
    use AssertPermissionTrait;

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserWillBeSaved::class, [$this, 'whenUserWillBeSaved']);
    }

    /**
     * @param UserWillBeSaved $event
     */
    public function whenUserWillBeSaved(UserWillBeSaved $event)
    {
        $attributes = array_get($event->data, 'attributes', []);
        if (array_key_exists('onesignal_id', $attributes)) {
            $user = $event->user;
            $actor = $event->actor;
            if ($actor->id !== $user->id) {
                $this->assertPermission(
                    $this->elementsOnlyRemoved(
                        $user->onesignal_id,
                        $attributes['onesignal_id']
                    )
                );
                $this->assertCan($actor, 'edit', $user);
            }
            $user->onesignal_id = $attributes['onesignal_id'];
            //$user->raise(new UserButtonsWereChanged($user));
        }
    }

}