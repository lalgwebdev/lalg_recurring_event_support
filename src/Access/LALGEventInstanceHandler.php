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
            $manager = \Drupal::service('group_relation_type.manager');
            $type = 'group_recurring_events_series:' . $entity->getType();
            $handler = $manager->getAccessControlHandler($type);
            $result = $handler->entityAccess($entity->getEventSeries(), $operation, $account, TRUE);
        }
        return $result;
    }
}
