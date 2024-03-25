export default class ResultMessage{
	static base(code, data, msg){
		return {
			code,
			data,
			msg,
			time: +new Date()
		}
	}
	static success(data={}){
		return ResultMessage.base(200, data, "success")
	}

	static error(msg){
		return ResultMessage.base(500, [], msg)
	}
}
