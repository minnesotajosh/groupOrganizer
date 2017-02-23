Meteor.publish('groups', function() {
    return Groups.find();
});

Meteor.publish('notifications', function() {
    return Notifications.find();
});
