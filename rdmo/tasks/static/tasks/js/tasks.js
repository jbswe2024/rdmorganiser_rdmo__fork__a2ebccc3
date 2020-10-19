angular.module('tasks', ['core'])

.factory('TasksService', ['$resource', '$timeout', '$window', '$q', 'utils', function($resource, $timeout, $window, $q, utils) {

    /* get the base url */

    var baseurl = angular.element('meta[name="baseurl"]').attr('content');

    /* configure resources */

    var resources = {
        tasks: $resource(baseurl + 'api/v1/tasks/tasks/:list_action/:id/:detail_action/'),
        catalogs: $resource(baseurl + 'api/v1/questions/catalogs/index/'),
        attributes: $resource(baseurl + 'api/v1/domain/attributes/:id/'),
        conditions: $resource(baseurl + 'api/v1/conditions/conditions/:id/'),
        settings: $resource(baseurl + 'api/v1/core/settings/'),
        sites: $resource(baseurl + 'api/v1/core/sites/'),
        groups: $resource(baseurl + 'api/v1/core/groups/'),
    };

    /* configure factories */

    var factories = {
        tasks: function(parent) {
            return {
                uri_prefix: service.settings.default_uri_prefix,
                attribute: null,
                sites: [1]
            };
        }
    };

    /* create the tasks service */

    var service = {};

    service.init = function(options) {
        service.catalogs = resources.catalogs.query();
        service.attributes = resources.attributes.query();
        service.conditions = resources.conditions.query();
        service.settings = resources.settings.get();
        service.sites = resources.sites.query();
        service.groups = resources.groups.query();
        service.uri_prefixes = []
        service.uri_prefix = ''

        service.initView().then(function () {
            var current_scroll_pos = sessionStorage.getItem('current_scroll_pos');
            if (current_scroll_pos) {
                $timeout(function() {
                    $window.scrollTo(0, current_scroll_pos);
                });
            }
        });

        $window.addEventListener('beforeunload', function() {
            sessionStorage.setItem('current_scroll_pos', $window.scrollY);
        });
    };

    service.initView = function(options) {
        return resources.tasks.query({list_action: 'index'}, function(response) {
            service.tasks = response;
            service.uri_prefixes = response.reduce(function(list, item) {
                if (list.indexOf(item.uri_prefix) < 0) {
                    list.push(item.uri_prefix)
                }
                return list
            }, [])
        }).$promise;
    };

    service.openFormModal = function(resource, obj, create, copy) {
        service.errors = {};
        service.values = utils.fetchValues(resources['tasks'], factories['tasks'], obj, create, copy);

        $q.when(service.values.$promise).then(function() {
            $('#' + resource + '-form-modal').modal('show');
            $('formgroup[data-quicksearch="true"]').trigger('refresh');
        });
    };

    service.submitFormModal = function(resource) {
        utils.storeValues(resources['tasks'], service.values).then(function() {
            $('.modal').modal('hide');
            service.initView();
        }, function(result) {
            service.errors = result.data;
        });
    };

    service.openDeleteModal = function(resource, obj) {
        service.values = obj;
        $('#' + resource + '-delete-modal').modal('show');
    };

    service.submitDeleteModal = function(resource) {
        if (angular.isDefined(service.values.id)) {
            resources[resource].delete({id: service.values.id}, function() {
                $('.modal').modal('hide');
                service.initView();
            });
        } else {
            $('.modal').modal('hide');
        }
    };

    service.hideTask = function(item) {
        if (service.filter && item.key.indexOf(service.filter) < 0
                           && item.title.indexOf(service.filter) < 0
                           && item.text.indexOf(service.filter) < 0) {
            return true;
        }
        if (service.uri_prefix && item.uri_prefix != service.uri_prefix) {
            return true;
        }
    };

    return service;

}])

.controller('TasksController', ['$scope', 'TasksService', function($scope, TasksService) {

    $scope.service = TasksService;
    $scope.service.init();

}]);
