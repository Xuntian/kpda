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
	--self:delete({admin_id=2})
	local userinfo, err = self:findOne({name=params.name, password=params.password})
	return userinfo, err
end

function admin:test1()
	return "asd"
end

return admin