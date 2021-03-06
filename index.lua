nws.import("helper/errors")
nws.import("helper/const")
nws.import("helper/filter")

-- local user = nws.import("controller/user")
-- local data_source = nws.import("controller/data_source")
-- local page = nws.import("controller/page")

local admin = nws.import("controller/admin")

nws.router("/", function(ctx)
	ctx.response:render("index.html", {})
end)

-- nws.router(nws.config.api_url_prefix .. "user", user)
-- nws.router(nws.config.api_url_prefix .. "data_source", data_source)
-- nws.router(nws.config.api_url_prefix .. "page", page)
nws.router(nws.config.api_url_prefix .. "admin", admin)

nws.router("/", function(ctx)
	ctx.response:render("index.html", {})
end)
nws.router.default_handler = function(ctx) 
	local url = ctx.request.url 
	ctx.response:render("index.html", {})
end




