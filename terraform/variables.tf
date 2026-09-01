variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Application resource group name"
  type        = string
}

variable "app_service_plan_name" {
  description = "App Service Plan name"
  type        = string
}

variable "ui_app_name" {
  description = "UI App Service name"
  type        = string
}

variable "api_app_name" {
  description = "API App Service name"
  type        = string
}