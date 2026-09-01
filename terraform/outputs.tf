output "resource_group_name" {
  value = module.resource_group.name
}

output "app_service_plan_name" {
  value = module.app_service_plan.name
}

output "api_app_name" {
  value = module.api_app.name
}

output "api_url" {
  value = module.api_app.url
}