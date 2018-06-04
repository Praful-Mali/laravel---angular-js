app.controller('employeesController' , function($scope , $http , API_URL){
		
		//retrieve employee listing from api
		$http.get(API_URL + "employees")
			.success(function(response){
				$scope.employees = response;
			});
	
		//show modal form
		$scope.toggle = function(modalstate , id){
			$scope.modalstate = modalstate;
			
			switch(modalstate){
				
				case 'add':
					$scope.form_title = 'Add New Employee';
					break;
				case 'edit':
					$scope.form_title ="Employee Details";
					$scope.id = id;
					$http.get(API_URL+'employees/'+id)
						.success(function(response){
							console.log(response);
							$scope.employee = response;
						});
				break;

				default:
				break;
			}
			console.log(id);
			$('#myModal').modal('show');
		}
		
		
		
	//save new record / update exiting recode

	$scope.save = function(modalstate , id){
		var url = API_URL + "employees";
		
		//append employee id to the url the form is in edit mode
		if(modalstate === 'edit'){
			url += "/"+id;
		}
		
		$http({
			
			method:'post',
			url:url,
			data : {name: $scope.employee.name, email: $scope.employee.email, contact_number: $scope.employee.contact_number, position: $scope.employee.position},
			headers:{'Contect-Type':'application/x-www-form-urlencoded'}
		}).success(function(response){
			console.log(response);
			location.reload();
		}).error(function(response){
			console.log(response);
			alert('This is embarassing. An error has occured. Please check the log for details');
			
		});
		
		
		
	}
	
	//delete recode
	
	$scope.confirmDelete = function(id){
		var isConfirmDelete = confirm('Are you sure you want this record?');
		if(isConfirmDelete){
			$http({
				method:'DELETE',
				url: API_URL + 'employees/'+id
			}).success(function(data){
				console.log(data);
				location.reload();
			}).error(function(data){
				console.log(data);
				alert('Unable to delete');
			});
			
		}else {
			return false;
		}	
	}		
		
		
});