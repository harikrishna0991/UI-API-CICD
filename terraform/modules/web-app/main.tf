resource "azurerm_linux_web_app" "this" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id

  site_config {
    always_on = true

    application_stack {
      dotnet_version = var.dotnet_version
    }
  }

  app_settings = var.app_settings
}