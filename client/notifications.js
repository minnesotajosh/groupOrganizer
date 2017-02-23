Template.notifications.events({
    'click #checkNotifications': function(event) {
        var notifications = Notifications.find({}).map(notification => {
            console.log(notification);
            Notifications.update({ _id: notification._id }, { $set: { isNew: false } });
        });
    }
});

Template.notifications.helpers({
    'notifications': function() {
        return Notifications.find({});
    },
    'newNotifications': function() {
        return Notifications.find({ isNew: true });
    }
});
