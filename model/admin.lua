-- title: data source
-- author: xiaoyao
-- date: 2017-9-28

local orm = nws.gettable("nws.orm")
--local data_source_db = nws.import("model/data_source")
--local site_data_source_db = nws.import("model/site_data_source")

-- admin 表
local admin = nws.inherit(orm)

admin:tablename("admin")
admin:addfield("name","string")
admin:addfield("password","string")
admin:addfield("email","string")
admin:addfield("cellphone","string")
admin:addfield("status","number")
admin:addfield("authority", "number")
admin:addfield("role_id", "number")
admin:addfield("create_time", "string")
admin:addfield("update_time", "string")

--[[
local create_time = tostring(os.time())
local update_time = tostring(os.time())
local pass = nws.util.md5("123456")
admin:insert({name="lzq", password=pass, email="1@1.com", cellphone="12345678901", status=1, authority="111111", role_id=0, create_time=create_time, update_time=update_time})
]]

function admin:test(params)
	-- self:delete({admin_id=2})
	-- local userinfo, err = self:findOne({name=params.name, password=params.password})
	-- return userinfo, err
end

function admin:test1()
	return "asd"
end

-- function admin:isVaild(admin_name)
-- 	local isVaild = false
-- 	nws.log("1111111111111111")
-- 	local admin_info = self:find({name=admin_name})
-- 	local admin_num = #admin_info
-- 	nws.log("admin_num: " .. admin_num)
-- 	nws.log("admin_info: " .. admin_info)
-- 	local admin_status = admin_info[1].status
-- 	if admin_info[1].status == 1 then 
-- 		isVaild = true
-- 	end
-- 	return isVaild
-- end

function admin:isRoot(admin_name)
	local isRoot = false
	if admin_name then 
		local admin_info = self:find({name=admin_name})
		if admin_info[1].role_id == 0 then 
			isRoot = true
		end
	end
	return isRoot
end

function admin:getAuthorith(admin_name)
	local authority = 1
	if admin_name then 
		local admin_info = self:find({name=admin_name})
		if admin_info[1].status == 1 then 
			authority = admin_info[1].authority
		end
	end
	return authority
end

return admin