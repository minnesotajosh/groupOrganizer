Meteor.subscribe('groups');

Template.groupsList.events({
    'submit form': function(e) {
        e.preventDefault();

        var group = {
            groupName: $(e.target).find('[name=groupName]').val(),
            createdBy: Meteor.userId(),
            members: [{
                _id: Meteor.userId(),
                firstName: Meteor.user().profile.firstName,
                lastName: Meteor.user().profile.lastName
            }]
        };

        var groupId = Groups.insert(group);
        Router.go('/group/' + groupId);
    }
});

Template.groupsList.helpers({
    'groups': function() {
        return Groups.find({});
    }
});
