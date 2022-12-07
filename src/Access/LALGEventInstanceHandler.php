<?php

namespace Drupal\lalg_recurring_event_support\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

use Drupal\recurring_events\Entity\EventSeries;
use Drupal\recurring_events\EventInstanceAccessControlHandler;

class LALGEventInstanceHandler extends EventInstanceAccessControlHandler {
    protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
        $result = parent::checkAccess($entity, $operation, $account);
        if(!$result->isAllowed()) {
            // Need GroupContentAccessControlHandler not EventSeriesAccessControlHandler
            $manager = \Drupal::service('plugin.manager.group_content_enabler');
            if($manager->hasHandler('group_recurring_events_series:lalg_event', 'access')) {
              $handler = $manager->getAccessControlHandler('group_recurring_events_series:lalg_event');
              $result = $handler->entityAccess($entity->getEventSeries(), $operation, $account, TRUE);
            }
        }
        return $result;
    }
}
