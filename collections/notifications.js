Notifications = new Mongo.Collection('notifications');

const assignee = new SimpleSchema({
    _id: {
        type: String
    }
});

Notifications.attachSchema(new SimpleSchema({
    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    },
    assignedTo: {
        type: [assignee]
    },
    message: {
        type: String
    }
}));
