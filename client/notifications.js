Template.notifications.events({
    'blur #checkNotifications, click #checkNotifications': function(event) {
        console.log($(event.target));
        if ($(event.target).closest('.dropdown').hasClass('open')) {
            var notifications = Notifications.find({}).map(notification => {
                Notifications.update({ _id: notification._id }, { $set: { isNew: false } });
            });
        }
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
