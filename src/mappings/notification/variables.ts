import {
  NotificationAction,
  NotificationsBehaviour,
  NotificationTarget
} from './types';
import { EventName } from '../../model';

const NotificationsBehaviourOnPostCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner']
};

const NotificationsBehaviourOnPostShared: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner', 'SharedPostOwner']
};

const NotificationsBehaviourOnCommentCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'RootPostSpaceOwner']
};

const NotificationsBehaviourOnCommentReplyCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'ParentPostOwner']
};

export const EVENT_NOTIFICATION_RELATIONS: Partial<
  Record<EventName, NotificationsBehaviour>
> = {
  PostCreated: NotificationsBehaviourOnPostCreated,
  PostShared: NotificationsBehaviourOnPostShared,
  CommentCreated: NotificationsBehaviourOnCommentCreated,
  CommentReplyCreated: NotificationsBehaviourOnCommentReplyCreated
};
