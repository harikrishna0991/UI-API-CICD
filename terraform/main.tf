module "resource_group" {
  source = "./modules/resource-group"

  name     = var.resource_group_name
  location = var.location
}

module "app_service_plan" {
  source = "./modules/app-service-plan"

  name                = var.app_service_plan_name
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
}

module "api_app" {
  source = "./modules/web-app"

  name                = var.api_app_name
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
  service_plan_id     = module.app_service_plan.id

  dotnet_version = "8.0"

  app_settings = {
    ASPNETCORE_ENVIRONMENT = "Production"
  }
}