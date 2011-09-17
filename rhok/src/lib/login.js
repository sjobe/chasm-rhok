/**
 * 
 */
function login(options){
	options = options || {};
	$.extend(options,{
		buttonSelector:"#infoData\\:loginLogout",
		userSelector:"#infoData\\:user",
		passwordSelector:"#infoData\\:password",
		postLoginEvent:{idSelector:"#infoData\\:fileList",idEventName:"refresh"},
		containerSelector:"fieldset",
		containerEffect:"highlight"
	});
	var loginLogout = $(options.buttonSelector);
	var user = $(options.userSelector);
	var password = $(options.passwordSelector);
	var postLogin = $(options.postLoginEvent.idSelector);
	$.couch.login({name:user.val(),password:password.val(),
		success: function(data,text,xhr){
			loginLogout.val("Logout").closest( options.containerSelector ).effect( options.containerEffect );
			user.prop("disabled", true);
			password.prop("disabled",true);
			postLogin.trigger(options.postLoginEvent.idEventName, data);
		},
		error: function(data,text,xhr){
			//show something nice
			loginLogout.click();
		}
	});
}
function logout(options){
	options = options || {};
	$.extend(options,{
		buttonSelector:"#infoData\\:loginLogout",
		userSelector:"#infoData\\:user",
		passwordSelector:"#infoData\\:password",
		containerSelector:"fieldset",
		containerEffect:"highlight"
	});
	var loginLogout = $(options.buttonSelector);
	var user = $(options.userSelector);
	var password = $(options.passwordSelector);
	$.couch.session(
		{success:function(data){
			$.couch.logout(data);
			loginLogout.val("Login").closest( options.containerSelector ).effect( options.containerEffect );
			user.prop("disabled", false).val("");
			password.prop("disabled",false).val("");
		}}
	);
}
	

