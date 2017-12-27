local controller = nws.gettable("nws.controller")
--  创建test控制器
local admin = controller:new("admin")

--local convert_model = require("model/convert")
local admin_model = nws.import("model/admin")

function admin:asd(ctx)
    return "asd";
end

function admin:login(ctx)
    local params = ctx.request:get_params()
    local name = params.name
	local password = nws.util.md5(params.password)
	local admin_info = nil
	if not name or not password then
		return (errors:wrap(errors.PARAMS_ERROR, params))
    end
    
    local err, admin_info = admin_model:find({name=name, password=password})
    nws.log(err)
    nws.log(admin_info)
	if not admin_info then
		return (errors:wrap("用户名或密码错误"))
	end

	-- 生成token
	local token = nws.util.encode_jwt({admin_id = admin_info.admin_id, username = admin_info.name}, nil, 3600 * 100)

	nws.log(token)
	return (errors:wrap(nil, {token = token, admin_info = admin_info}))
end

function admin:new(ctx)
    local params = ctx.request:get_params()
    if not params.name or not params.password then
		return (errors:wrap(errors.PARAMS_ERROR, params))
	end
    return "new"

end

-- function admin:test(ctx)
--     --admin_model:delete({admin_id=2})
--     local params = ctx.request:get_params()
--     --local info, err = admin_model:test(params)
--     local info, err = admin_model:find({name=params.name, password=params.password})
--     return info
-- end

-- function admin:paramsFilter(ctx)
--     local params = ctx.request:get_params()
--     if not params.name or not params.password then
-- 		return (errors:wrap(errors.PARAMS_ERROR, params))
-- 	end
-- end   

return admin