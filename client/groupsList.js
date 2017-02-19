Meteor.subscribe('groups');

Template.groupsList.events({
    'submit form': function(event) {
        event.preventDefault();

        var formArray = $(event.target).serializeArray();
        var group = {};
        for (var i=0; i<formArray.length; i++) {
            if (formArray[i].name !== "location.address") {
                group[formArray[i].name] = formArray[i].value;
            } else {
                group.location = getMapLocation(formArray[i].value);
            }
        }

        function getMapLocation(streetAddress) {
            return {
                address: streetAddress,
                lat: '123',
                lng: '456'
            }
        }

        group.members = [{
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        }];

        group.leaders = [{
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        }];

        var groupId = Groups.insert(group);
        Router.go('/group/' + groupId);
    }
});

Template.groupsList.helpers({
    'groups': function() {
        return Groups.find({});
    }
});
