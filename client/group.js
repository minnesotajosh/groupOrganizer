Template.groupPage.events({
    'submit form': function(e) {
        e.preventDefault();
        var groupName = $(e.target).find('[name=groupName]').val();
        Groups.update({ _id: this._id }, { $set: { groupName: groupName }});
    },
    'click [name=deleteGroup]': function() {
        Groups.remove({ _id: this._id });
        Router.go('groupsList');
    },
    'click [name=leaveGroup]': function() {
        this.members = _.reject(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        Groups.update({ _id: this._id }, { $set: { members: this.members }});
    },
    'click [name=joinGroup]': function() {
        this.members.push({
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        });
        Groups.update({ _id: this._id }, { $set: { members: this.members }});
    }
});

Template.groupPage.helpers({
    'isOwner': function() {
        return this.createdBy === Meteor.userId();
    },
    'canJoin': function() {
        var isInGroup = _.find(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        return Meteor.userId() && !isInGroup;
    },
    'canLeave': function() {
        var isInGroup = _.find(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        return Meteor.userId() && isInGroup;
    }
});
