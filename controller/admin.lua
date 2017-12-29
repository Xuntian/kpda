local controller = nws.gettable("nws.controller")
--  创建test控制器
local admin = controller:new("admin")

--local convert_model = require("model/convert")
local admin_model = nws.import("model/admin")

function admin:asd(ctx)
    return "asd";
end

-- function admin:list()
--     local admin_info, err = admin_model:find()
--     return (errors:wrap(nil, {admin_info = admin_info}))
-- end

function admin:login(ctx)
    local params = ctx.request:get_params()
    local name = params.name
    local password = nws.util.md5(params.password)
    --local password = params.password
	--local admin_info = nil
	if not name or not password then
		return (errors:wrap(errors.PARAMS_ERROR, params))
    end
    
    local admin_info, err = admin_model:find_one({name=name, password=password})
	if not admin_info then
		return (errors:wrap("用户名或密码错误"))
	end

	-- 生成token
	local token = nws.util.encode_jwt({admin_id = admin_info.admin_id, admin_name = admin_info.name}, nil, 3600 * 100)

	nws.log(token)
	return (errors:wrap(nil, {token = token, admin_info = admin_info}))
end

function admin:add(ctx)
    local params = ctx.request:get_params()
    if not params.name or not params.email or not params.cellphone or not params.authority or not params.role_id then
		return (errors:wrap(errors.PARAMS_ERROR, params))
    end
    local admin_info_name = admin_model:find({name=params.name})
    if next(admin_info_name) then 
        return (errors:wrap("用户名已存在"))
    end
    local admin_info_email = admin_model:find({email=params.email})
    if next(admin_info_email) then 
        return (errors:wrap("邮箱已存在"))
    end
    local admin_info_cellphone = admin_model:find({cellphone=params.cellphone})
    if next(admin_info_cellphone) then 
        return (errors:wrap("手机号已存在"))
    end

    local password = nws.util.md5("123456")
    local time = tostring(os.time())
    --admin_info, err = admin_model:insert({name=params.name, password=password, email=params.email, cellphone=params.cellphone, status=1, authority=params.authority, role_id=params.role_id, create_time=time, update_time=time})
    local err, data = admin_model:insert({name=params.name, password=password, email=params.email, cellphone=params.cellphone, status=1, authority=params.authority, role_id=params.role_id, create_time=time, update_time=time})
    
    if err then
        ctx.response:send(err, 400)
    else
        -- ctx.response:send(data, 200)
        return (errors:wrap(nil, {admin_info = data}))
    end
end

function admin:test(ctx)
    --admin_model:delete({admin_id=2})
    local params = ctx.request:get_params()
    --local info, err = admin_model:test(params)
    local info, err = admin_model:find({name=params.name, password=params.password})
    return info   
end

return admin