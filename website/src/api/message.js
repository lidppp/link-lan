import http from "@/utils/http.js";

export function getMessage(){
	return http({
		method: "get",
		url: "/message"
	})
}

export function addMessage(data){
	return http({
		method: "post",
		url: "/message",
		data
	})
}

export function delMessage(data){
	return http({
		method: "delete",
		url: "/message",
		data
	})
}
