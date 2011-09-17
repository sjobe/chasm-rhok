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
			user.prop("disabled", true).val("");
			password.prop("disabled",true).val("");
			postLogin.trigger(options.postLoginEvent.idEventName, data);
		}
	});
}
function logout(options){
	options = options || {};
	$.extend(options,{
		buttonSelector:"#infoData\\:loginLogout",
		containerSelector:"fieldset",
		containerEffect:"highlight"
	});
	var loginLogout = $(options.buttonSelector);
	$.couch.session(
		{success:function(data){
			$.couch.logout(data);
			loginLogout.val("Login").closest( options.containerSelector ).effect( options.containerEffect );
			user.prop("disabled", false);
			password.prop("disabled",false);
		}}
	);
}
	

