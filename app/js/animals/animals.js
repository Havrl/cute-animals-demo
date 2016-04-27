(function () {
    'use strict';

    angular
        .module('app.animals')
        .controller('Animals', Animals);
    //.controller('ModalController');

    Animals.$inject = ['$scope', 'dataService', '$uibModal', '$sanitize', 'usSpinnerService', '$timeout'];

    function Animals($scope, dataService, $uibModal, $sanitize, usSpinnerService, $timeout) {

        /*jshint validthis: true */
        var vm = this, timer1;

        vm.pageSize = 15;
        vm.page = 1;
        vm.items = [];
        vm.totalCount = 0;
        vm.pageChanged = pageChanged;
        vm.loading = false;

        vm.searchType = 'kittens'; // default type
        vm.searchInput = '';
        vm.searchQuery = '';

        vm.loadItems = loadItems;
        vm.showImage = showImage;

        vm.modalInstance = null;
        $scope.modalVm = {
            close: closeModal,
            animationUrl: '',
            animationTitle: ''
        };


        function loadItems() {

            vm.items.length = 0;

            vm.loading = true;
            usSpinnerService.spin('spinner-1');


            // simulate some delay
            timer1 = $timeout(function() {

                vm.searchQuery = null;
                vm.searchQuery = _.isEmpty(vm.searchInput) ? vm.searchType : $sanitize(vm.searchInput.toLowerCase()) +
                ' ' + vm.searchType;

                return dataService.getList(vm.searchQuery, vm.page - 1, vm.pageSize).then(function (res) {
                    vm.items = res.data;
                    vm.totalCount = res.pagination.total_count;

                }).finally(function() {
                    vm.loading = false;
                    usSpinnerService.stop('spinner-1');
                });

            }, 100);
        }

        function showImage(item) {
            $scope.modalVm.animationUrl = item.images.original.url;
            $scope.modalVm.animationTitle = item.slug;

            vm.modalInstance = $uibModal.open({
                templateUrl: 'modalImage.html',
                scope: $scope
            });
        }

        function closeModal() {
            vm.modalInstance.close();
        }

        function pageChanged() {
            loadItems();
        }

        $scope.$on('$destroy', function() {
            $timeout.cancel(timer1);
        });
    }
})();
