Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'groupsList'});
Router.route('/group/:_id', {
    name: 'groupPage',
    data: function() {
        var currentGroup = this.params._id;
        return Groups.findOne({ _id: currentGroup });
    }
});
